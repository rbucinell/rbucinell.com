using System;

namespace ChristmasPuzzle
{
	public class LockedBoxException : Exception
	{
		public LockedBoxException()
		{
		}

		public LockedBoxException(string message) 
			: base(message)
		{

		}

		public LockedBoxException(string message, Exception inner) 
			: base ( message, inner )
		{
			
		}
	}
}