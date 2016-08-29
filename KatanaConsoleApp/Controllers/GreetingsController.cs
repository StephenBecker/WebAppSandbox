using KatanaConsoleApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace KatanaConsoleApp.Controllers
{
    public class GreetingsController : ApiController
    {
        public Greeting Get(int? id = -1, string message = "")
        {
            string _message = message;
            if (id != -1) { message = message + " Your Id =" + id; };
            return new Greeting { Text = "Hello World! " + message };
        }
    }
}
