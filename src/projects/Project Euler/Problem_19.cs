using System;
using System.IO;
using System.Text;

class Problem_19
{
	static void Main()
	{
		const int YEAR_START = 1901, YEAR_END = 2000;
		int sundayCount = 0;

		for(int year = YEAR_START; year <= YEAR_END; year++)
		{
			for(int month = 1; month <= 12; month++)
			{
				DateTime date = new DateTime(year, month, 1);
				
				if(date.DayOfWeek == DayOfWeek.Sunday)
					sundayCount++;
			}
		}

		Console.WriteLine(sundayCount);
	}
}