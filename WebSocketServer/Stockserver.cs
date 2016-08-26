using FizzWare.NBuilder;
using Fleck;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web.Script.Serialization;

namespace WebSocketServer
{
    public class Stockserver
    {
        private int _index = 0;
        private List<IWebSocketConnection> _sockets = new List<IWebSocketConnection>();
        private IList<Stock> _stocks = null;
        private Timer _timer = null;

        public void Start()
        {
            Fleck.WebSocketServer server = new Fleck.WebSocketServer("ws://0.0.0.0:8182");

            server.Start(socket =>
            {
                socket.OnOpen = () =>
                {
                    Console.WriteLine("Connection open.");
                    this._sockets.Add(socket);
                };
                socket.OnClose = () =>
                {
                    Console.WriteLine("Connection closed.");
                    this._sockets.Remove(socket);
                };
            });

            this._stocks = Builder<Stock>.CreateListOfSize(1000).All().Build();

            if (this._timer == null)
            {
                this._timer = new Timer(SendStock, null, 0, 1500);
                Console.WriteLine("");
                Console.WriteLine("Sendign stock info");
            };
            Console.ReadLine();
        }

        private void SendStock(Object state)
        {
            JavaScriptSerializer seralizer = new JavaScriptSerializer();

            string stock = seralizer.Serialize(this._stocks[this._index]);
            this._sockets.ToList().ForEach(s => s.Send(stock));
            this._index++;

            if (this._index == 999)
            {
                this._index = 0;
            }
        }
    }
}
