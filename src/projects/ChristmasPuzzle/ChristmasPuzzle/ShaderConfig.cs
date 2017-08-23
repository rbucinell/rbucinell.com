using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Policy;
using System.Text;

namespace ChristmasPuzzle
{
	public class ShaderConfig
	{
		private List<ShaderData> DataList;
		private int _minimumSize;
		private int[] raw;

		public ShaderConfig()
		{
			DataList = new List<ShaderData>();
			raw = new int[0];
			Configure();
		}

		public ShaderConfig(int[] rawdata)
		{
			raw = rawdata;
			Configure();
		}

		public ShaderConfig Clone()
		{
			ShaderConfig c = new ShaderConfig( raw );
			return c;
		}

		/// <summary>
		/// Constructor Helper
		/// </summary>
		private void Configure()
		{
			DataList = new List<ShaderData>();
			int index = 0;
			for ( int i = 0; i < raw.Length; i++, index++ )
			{
				int val = raw[ i ];
				DataList.Add( new ShaderData( val, index ) );
				index += val;
			}
			_minimumSize = index - 1;	
		}

		public List<ShaderData> Elements
		{
			get { return DataList; }
			set { DataList = value; }
		}

		public int MinimumSize
		{
			get
			{
				return _minimumSize;
			}
		}

		/// <summary>
		/// Shifts the starting position of the 
		/// </summary>
		/// <param name="index"></param>
		/// <param name="amount"></param>
		public void ShiftElements(int index, int amount)
		{
			for (int i = index; i < DataList.Count; i++)
			{
				DataList[ i ] = new ShaderData( DataList[ i ].Length, DataList[ i ].StartIndex + amount );
			}
		}

		public override string ToString()
		{
			const string filled = "[■]";
			const string empty = "[ ]";

			StringBuilder sb = new StringBuilder();
			for (int i = 0; i < Elements.Count; i++)
			{
				ShaderData cur = Elements[i];

				//Draw filled Squares for this element
				string f = String.Join("", Enumerable.Repeat(filled, cur.Length));
				string e = String.Empty;
				
				//Draw empty Squares
				if (i + 1 < Elements.Count)
				{
					ShaderData next = Elements[i + 1];
					int len = next.StartIndex - (cur.StartIndex + cur.Length);
					e = String.Join("", Enumerable.Repeat(empty, len));
				}

				sb.Append(f + e);
			}
			//Fill any empty squares at the end
			sb.Append( String.Join( "", Enumerable.Repeat( empty, 25 - MinimumSize ) ) );
			return sb.ToString();
		}
	}
}
