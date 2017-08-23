using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ChristmasPuzzle
{
	public class ShaderData
	{
		public ShaderData(int len, int index)
		{
			Length = len;
			StartIndex = index;
		}

		public int StartIndex
		{
			get;
			set;
		}
		public int Length
		{
			get;
			set;
		}
	}
}
