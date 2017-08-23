using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Numeric;

namespace ProjectEuler
{
    class Problem_25 : Problem
    {
        private const int PROBLEM_NUMBER = 25;
        public Problem_25(string name) : base(name)
        {
            Number = PROBLEM_NUMBER;
        }

        public override void Run()
        {
           Fib();
        }

        private void Fib()
        {
            int i = 100;
            Console.WriteLine( i + ") " + fib( i ) );
            Console.WriteLine( i + ") " + Fib( i ) );
            /*
            for (int i = 0; i < 10; i++)
            {
                Console.WriteLine(i + ") " + Fib(i));
            }*/
        }

        long fib( long term, long val = 1, long prev = 0 )
        {
            if ( term == 0 ) return prev;
            if ( term == 1 ) return val;
            return fib( term - 1, val + prev, val );
        }

        Dictionary<int, long> table = new Dictionary<int, long>();

        private long Fib(int index)
        {
            if( table.ContainsKey(index) )
                return table[ index ];
            if (index <= 2)
            {
                table.Add(index, 1);
                return 1;

            }
            else
            {
                table.Add(index, Fib(index - 1) + Fib(index - 2));
                return table[ index ];
            }
        }
    }
}
