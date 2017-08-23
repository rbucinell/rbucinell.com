using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
namespace ProjectEuler
{
    class Program
    {
        static void Main( string[] args )
        {
            Problem[] problems =
            {
                new Problem_22( "Names scores" ),
                new Problem_25( "1000-digit Fibonacci number"), 
            };


            foreach (var problem in problems)
            {
                string header = String.Format("\nExecuting Problem {0}: \"{1}\"", problem.Number, problem.Name);
                Console.WriteLine(header);
                Console.WriteLine(new string('-', header.Length));
                problem.Run();
            }

            Console.ReadKey();

        }
    }
}
