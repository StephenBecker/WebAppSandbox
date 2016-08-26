namespace WebSocketServer
{
    public class Stock
    {
        public bool IsUp { get; set; }
        public decimal PercentChange { get; set; }
        public string Symbol { get; set; }
        public decimal Value { get; set; }
    }
}
