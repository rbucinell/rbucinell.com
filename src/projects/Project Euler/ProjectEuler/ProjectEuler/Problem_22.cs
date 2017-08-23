using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace ProjectEuler
{
    class Problem_22 : Problem
    {
        private const int PROBLEM_NUMBER = 22;

        public Problem_22(string name) : base(name)
        {
            Number = PROBLEM_NUMBER;
        }

        public override void Run()
        {
            try
            {
                string text =
                    File.ReadAllText(
                        @"C:\Users\rbucinel\Documents\Project Euler\ProjectEuler\ProjectEuler\data\p22_names.txt");
                char[] deliminators = {',', '"'};
                string[] names = text.Split(deliminators, StringSplitOptions.RemoveEmptyEntries);

                Array.Sort(names);

                long runningtotal = 0;
                for (int index = 0; index < names.Length; index++)
                {
                    string name = names[index];
                    long value = AlphabeticalValue(name);
                    int order = index + 1;
                    long product = value*order;
                    runningtotal += product;
                }
                Console.WriteLine(runningtotal);
            }
            catch (FileNotFoundException fnfe)
            {
                Console.WriteLine("Could not find p22_names.txt");
            }

        }


        private long AlphabeticalValue(string name)
        {
            long result = 0;
            foreach (char c in name)
            {
                result += c - 64;
            }
            return result;
        }
    }
}
