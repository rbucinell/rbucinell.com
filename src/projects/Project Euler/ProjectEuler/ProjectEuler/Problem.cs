using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ProjectEuler
{
    class Problem
    {
        public string Name { get; protected set; }
        public virtual int Number { get; protected set; }

        public virtual void Run()
        {
        }

        public Problem(string name)
        {
            Name = name;
            Number = -1;
        }
    }
}
