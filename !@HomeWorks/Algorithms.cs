using System;

namespace MathExtensions
{
    public static class Algorithms
    {
        /// <summary>
        /// This method calculates and returns the first n prime numbers like a 
        /// motherfucker.
        /// The algorithm is based on the motherfuckin "Sieve of Eratosthenes" 
        /// by some ancient Greek motherfucker named Eratosthenes of Cyrene who
        /// was a mathematician like a boss.
        /// </summary>
        /// <see cref="http://en.wikipedia.org/wiki/Sieve_of_Eratosthenes">
        /// Check the mothafuckin' link like a good 'lil bitch.
        /// </see>
        /// <param name="n">
        /// n is for the number of primes you want, nigga!
        /// </param>
        /// <returns>
        /// Gives yo punk ass a motherfuckin' array of cold ass 
        /// Integer Primes, bitch.
        /// </returns>
        public static int[] FirstNPrimes(int n)
        {
            if (n < 1)
            {
                // Boy, you best be kidding me with dis shit, son!
                return new[] { -1 };
            }

            if (n == 1)
            {
                // Stop playing games, dis da real shit.
                return new[] { 2 };
            }

            if (n == 2)
            {
                // Two primes? Two? 
                // How bout two bitch slaps 'cross yo cunt ass!?
                return new[] { 2, 3 };
            }

            // Listen here son, we gonna do some boss ass math here now.
            // Gonna estimate the upper bound on this bitch. 
            // This motherfucking formula will get your bitch ass ta 
            // motherfuckin approximate the shit-fucking value of the Nth 
            // prime, Bitch!
            //
            // [p(n) ? n(ln(n) + ln(ln(n)) ? 0.9385)]
            // 
            var upperBound = (int)(n * (Math.Log(n) + Math.Log(Math.Log(n - 1))));

            // The square fucking root of the upper bound, 'cause we don't 
            // calculate shit after this, ...and dat shit is Gangsta!
            var sqrtUpperBound = (int)Math.Sqrt(upperBound);

            bool[] indexes;
            int[] primes;
            try
            {
                indexes = new bool[upperBound];
                primes = new int[n];
            }
            catch (OutOfMemoryException e)
            {
                // Bitch, you best check yo virtual memory! 
                // I ain't even playin!
                return new[] { -1 };
            }

            // Wanna know how gansta this shit is? 
            // We usin a motherfuckin boolean array to flip the bitch ass 
            // indexes dat ain't even prime, faggot!
            
            // Oh, you think 0 prime? 0 prime? Ain't even talkin' to you, son.
            indexes[0] = true;
            
            // You a kracka, ain't you? You a dumb ass trailer honkey 
            // thinkin 1 is prime?
            indexes[1] = true;

            var p = 0;
            for (var i = 2; i < sqrtUpperBound; i++)
            {
                if (!indexes[i])
                {
                    var j = i;
                    int k;

                    // i is prime like a motherfucker.
                    // Know what else prime? Yo mama! That bitch is infinite!
                    while ((k = i * j) < upperBound)
                    {
                        // Turn this bitch out like the bottom bitch she is.
                        indexes[k] = true;
                        j++;
                    }

                    // Gotta hit dat tight shit while we here.
                    primes[p] = i;
                    p++;
                }
            }

            // We hit dat shit and got our dicks wet with dem tight ass primes
            // Now we 'gon gedit gedit, pound da rest these primes like these 
            // bitches owe us money.
            for (var i = sqrtUpperBound; p < n; i++)
            {
                if (!indexes[i])
                {
                    primes[p] = i;
                    p++;
                }
            }

            // Primes, like a boss.
            return primes;
        }
    }
}
