using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Policy;
using System.Text;

namespace ChristmasPuzzle
{
	public class Box
	{
		private bool _filled;

		public Box( Point location)
		{
			Locked = false;
			Filled = false;
			Location = location;
		}

		public Box( Point location, bool filled, bool locked = false)
		{
			Locked = locked;
			Filled = filled;
			Location = location;
		}

		public bool Locked
		{
			get;
			set;
		}

		public bool Filled
		{

			get { return _filled; }
			set
			{
				if (Locked)
				{
					throw new LockedBoxException("Cannot modify box's state when locked");
				}
				_filled = value;
			}
		}

		public Point Location
		{
			get;
			private set;
		}
		
		public override string ToString()
		{
			if( Locked )
				return Filled ? "{■}" : "{ }";
			return Filled ? "[■]" : "[ ]";
		}
	}
}
