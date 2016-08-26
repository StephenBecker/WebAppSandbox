using System;

namespace WebSocketServer
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            Console.WriteLine();
            Console.WriteLine("Welcome to the socket server");
            Console.WriteLine();
            Console.WriteLine("Which server type to start:");
            Console.WriteLine("    1) Hello World/echo");
            Console.WriteLine("    2) Stock Ticker ");
            Console.WriteLine();

            string input = Console.ReadLine();

            if (input == "1")
            {
                HelloServer server = new HelloServer();
                server.Start();
            }
            else if (input == "2")
            {
                Stockserver server = new Stockserver();
                server.Start();
            }
            else
            {
                Console.WriteLine(string.Format("Sorry, {0} is not a valid option."));
            }
        }
    }
}
