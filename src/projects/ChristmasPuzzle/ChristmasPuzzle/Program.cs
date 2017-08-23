using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace ChristmasPuzzle
{
	/// <summary>
	/// Puzzle Solver for:
	/// http://www.gchq.gov.uk/press_and_media/news_and_features/Pages/Directors-Christmas-puzzle-2015.aspx
	/// </summary>
	public class Program
	{
		private static Grid grid;
		private static Point cur;

		private static int[][] row_shaders;
		private static int[][] col_shaders;

		public static void Main( string[] args )
		{
			grid = new Grid();
			row_shaders = new int[ Grid.GRID_SIZE ][];
			col_shaders = new int[ Grid.GRID_SIZE ][];
			PopulateShaderDataAndGridValues();
			FillandLock25LongShaderData();
			

			FindAllOfTheLegitimateRowConfigurations();

			/*
			for (int i = 0; i < Grid.GRID_SIZE; i++)
			{
				for (int j = 0; j < Grid.GRID_SIZE; j++)
				{
					try
					{
						grid.Fill( i, j );
					}
					catch ( LockedBoxException )
					{

					}
				}
			}
			*/

			Console.WriteLine( grid.ToString() );
			Console.ReadKey();
		}

		private static void FindAllOfTheLegitimateRowConfigurations()
		{
			ShaderConfig seed = new ShaderConfig(row_shaders[0]);
			
			//Create a list of possible configurations, seeded with the default configuration
			List<ShaderConfig> possibleConfigurations = new List<ShaderConfig>()
			{
				new ShaderConfig( row_shaders[ 0 ] )
			};
			int shiftPotential = Grid.GRID_SIZE - possibleConfigurations[0].MinimumSize;
			
			foreach (ShaderData element in seed.Elements)
			{
				ShaderConfig sc = seed.Clone();
				for (int i = 1; i <= shiftPotential; i++)
				{
					Console.WriteLine(sc.ToString());

					sc.ShiftElements(element.StartIndex, i);

					Console.WriteLine( sc.ToString() );
					possibleConfigurations.Add(sc);
				}
			}

			Console.WriteLine("Possible for Row 1");
			foreach (ShaderConfig config in possibleConfigurations)
			{
				Console.WriteLine(config.ToString());
			}

		}

		/// <summary>
		/// This will only fill the rows that cannot be shifted because the minimum space needed is 25 boxes.
		/// Since they cannot move, they are locked.
		/// </summary>
		private static void FillandLock25LongShaderData()
		{
			//Sum of each row
			for ( int y = 0; y < Grid.GRID_SIZE; y++ )
			{
				int[] curRowShaders = row_shaders[ y ];
				int min = MinimumBoxesNeeded( curRowShaders );
				bool fullRow = MinimumBoxesNeeded( curRowShaders ) == Grid.GRID_SIZE;

				//if its a full row: draw it
				if ( fullRow )
				{
					int curX = 0;
					for ( int i = 0; i < curRowShaders.Length; i++ )
					{
						int curShaderVal = curRowShaders[ i ];
						for ( int j = 0; j < curShaderVal; j++ )
						{
							try
							{
								grid.Fill( curX, y );
								grid.Lock( curX++, y );
							}
							catch (Exception)
							{
								curX++;
								throw;
							}
							
						}
						curX++;//Min 1 space buffer
					}
				}
			}
			
			//the Sum of Each col
			for ( int x = 0; x < Grid.GRID_SIZE; x++ )
			{
				int[] curColShaders = col_shaders[ x ];
				bool fullRow = MinimumBoxesNeeded( curColShaders ) == Grid.GRID_SIZE;

				//if its a full row: draw it
				if ( fullRow )
				{
					int curY = 0;
					for ( int i = 0; i < curColShaders.Length; i++ )
					{
						int curShaderVal = curColShaders[ i ];
						for ( int j = 0; j < curShaderVal; j++ )
						{
							try
							{
								grid.Fill( x, curY );
								grid.Lock( x, curY++ );
							}
							catch (LockedBoxException)
							{
								curY++;
							}
						}
						curY++;//Min 1 space buffer
					}
				}
			}

		}

		/// <summary>
		/// Returns the minimum Number of boxes needed to fill this row.
		/// </summary>
		/// <param name="arr"> Array of shader information</param>
		/// <returns>minimum number of boxes needed to be shaded</returns>
		public static int MinimumBoxesNeeded(int[] arr)
		{
			int count = arr.Length - 1; // Init value represents the number of minimum whitespace gaps
			foreach (int num in arr)
			{
				count += num;
			}
			return count;
		}

		/// <summary>
		/// Reads the data.txt, and fills the shader values and populates the grid
		/// </summary>
		public static void PopulateShaderDataAndGridValues()
		{
			using ( StreamReader sr = new StreamReader( File.OpenRead( "data.txt" ) ) )
			{
				do
				{
					string curLine = sr.ReadLine().Trim();

					//Read the rows data
					if ( curLine == "-rows-" )
					{
						for ( int i = 0; i < Grid.GRID_SIZE; i++ )
						{
							curLine = sr.ReadLine().Trim();
							if ( curLine == String.Empty )
							{
								continue;
							}
							string[] values = curLine.Split( ' ' );

							row_shaders[ i ] = new int[ values.Length ];
							for ( int j = 0; j < values.Length; j++ )
							{
								row_shaders[ i ][ j ] = Int32.Parse( values[ j ] );
							}
							int aa = 5;
						}
						int a = 5;
					}
					//Read the columns data
					else if (curLine == "-cols-")
					{
						for ( int i = 0; i < Grid.GRID_SIZE; i++ )
						{
							curLine = sr.ReadLine().Trim();
							if ( curLine == String.Empty )
							{
								continue;
							}
							string[] values = curLine.Split( ' ' );

							col_shaders[ i ] = new int[ values.Length ];
							for ( int j = 0; j < values.Length; j++ )
							{
								col_shaders[ i ][ j ] = Int32.Parse( values[ j ] );
							}
						}
						int cat = 6;
					}
					//Read the pre-determined filled spots
					else if ( curLine == "-filled[r,c]-" )
					{
						do
						{
							curLine = sr.ReadLine().Trim();

							if( curLine == String.Empty)
								continue;

							string[] cords = curLine.Split(',');
							int x = Int32.Parse(cords[0]);
							int y = Int32.Parse(cords[1]);

							grid.Fill(x, y);

						} while (!sr.EndOfStream && curLine != String.Empty);
					}
				}
				while ( ! sr.EndOfStream) ;
			}
		}
	}
}
