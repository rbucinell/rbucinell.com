using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Security.Cryptography.X509Certificates;
using System.Text;

namespace ChristmasPuzzle
{
	class Grid
	{
		public const int GRID_SIZE = 25;

		public Box[][] Data
		{
			get;
			private set;
		}

		public Grid()
		{
			Data = new Box[ GRID_SIZE ][];
			for (int i = 0; i < GRID_SIZE; i++)
			{
				Data[ i ] = new Box[ GRID_SIZE ];
				for (int j = 0; j < GRID_SIZE; j++)
				{
					Data[i][j] = new Box(new Point(j,i));
				}
			}
		}

		public void Fill(int x, int y)
		{
			Data[y][x].Filled = true;
		}

		public void Empty( int x, int y )
		{
			Data[ y ][ x ].Filled = true;
		}

		public void Lock(int x, int y)
		{
			Data[y][x].Locked = true;
		}

		public override string ToString()
		{
			StringBuilder sb = new StringBuilder();

			sb.AppendLine();
			sb.AppendLine("-=GRID=-");
			
			for (int i = 0; i < GRID_SIZE; i++)
			{
				for (int j = 0; j < GRID_SIZE; j++)
				{
					sb.Append(Data[i][j]);
				}
				sb.AppendLine();
			}
			return sb.ToString();
		}
	}

}
