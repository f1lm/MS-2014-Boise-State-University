/*
 * Copyright (c) 1999-2003 Christoph Mueller. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *
 * THIS SOFTWARE IS PROVIDED BY CHRISTOPH MUELLER ``AS IS'' AND ANY
 * EXPRESSED OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL CHRISTOPH MUELLER OR
 * HIS CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 * NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
 * STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 */

package de.must.dataobj;

import java.sql.Connection;
import java.sql.SQLException;

/**
 * Connection pool. More exactly it is a pool of connection holders. Provides
 * reusage of temporarily private used connections.
 * @see ConnectionHolder
 * @author Christoph Mueller
 */
public class ConnectionPool {

  private ConnectionSpecification connectionSpecification;
  private ConnectionHolder[] connectionHolders;
  private int capacity;
  private int size = 0;
	private int maxSize = 40;

  /**
   * Constructs a new connection pool with a default capacity of 10 connections and a maximum size of 40 open connections.
   * @param connectionSpecification the specification how to create the connection
   */
  public ConnectionPool(ConnectionSpecification connectionSpecification) {
		this(connectionSpecification, 10);
	}

	/**
	 * Constructs a new int array with the specified capacity with a maximum size of 40 open connections.
	 * @param connectionSpecification the specification how to create the connection
	 * @param baseCapacity the initial capacity
	 */
	public ConnectionPool(ConnectionSpecification connectionSpecification, int baseCapacity) {
    this(connectionSpecification, 10, 40);
  }

  /**
   * Constructs a new int array with the specified capacity.
   * @param connectionSpecification the specification how to create the connection
   * @param baseCapacity the initial capacity
   * @param maxSize the maximum number of opened connections
   */
  public ConnectionPool(ConnectionSpecification connectionSpecification, int baseCapacity, int maxSize) {
    this.connectionSpecification = connectionSpecification;
    this.capacity = baseCapacity;
    this.maxSize = maxSize;
    connectionHolders = new ConnectionHolder[baseCapacity];
  }

	/**
	 * Sets the maximum number of opened connections.
	 * @param i the maximum number of opened connections
	 */
	public void setMaxSize(int maxSize) {
		if (maxSize < 1) {
			de.must.io.Logger.getInstance().info(getClass(), "Max Size < 1 not allowed - max size stays " + this.maxSize );
		} else {
			de.must.io.Logger.getInstance().debug(getClass(), "Setting the connection pool's max size to " + maxSize);
			this.maxSize = maxSize;
		}
	}

	/**
	 * Return the maximum number of opened connections.
	 * @return the maximum number of opened connections
	 */
	public int getMaxSize() {
		return maxSize;
	}

  /**
   * Checks all open connections whether they are ok. If not, they are tried
   * to be reactivated.
   * (Once a night connections are often closed automatically.)
   */
  public void checkAndReactivateAllOpenConnections() {
    for (int i = 0; i < size; i++) {
      if (connectionHolders[i].isConnected()) {
        connectionHolders[i].checkAndReactivateDbConnIfNecessary();
      }
    }
  }

  /**
   * Returns a for private use locked connection holder.
   * @return a for private use locked connection holder
   */
  public synchronized ConnectionHolder getPrivateConnectionHolder() throws ConnectionPoolExhaustedException {
    for (int i = 0; i < size; i++) {
      if (connectionHolders[i].isVacant()) {
				// de.must.io.Logger.getInstance().debug(getClass(), "reusing connection # " + (i + 1));
        connectionHolders[i].lock();
        return connectionHolders[i];
      }
    }
    if (size == capacity) {
			connectionHolders = doubleCapacity(connectionHolders);
    }
		if (size == maxSize) {
			throw new ConnectionPoolExhaustedException();
		} else {
			size++;
			de.must.io.Logger.getInstance().debug(getClass(), "Connection pool's size increased to " + (size) + " at " + new java.util.Date(System.currentTimeMillis()));
			connectionHolders[size-1] = new ConnectionHolder(connectionSpecification);
			connectionHolders[size-1].lock();
		}
    return connectionHolders[size-1];
  }

  /**
   * Takes back a connection.
   * @param connectionToGiveBack the connection to give back.
   */
  public synchronized void takeBack(Connection connectionToGiveBack) {
    for (int i = 0; i < size; i++) {
      // if (connectionHolders[i].getConnection().equals(connectionToGiveBack)) {
      if (connectionHolders[i].getConnection() == connectionToGiveBack) {
        connectionHolders[i].unlock();
        // de.must.io.Logger.getInstance().debug(getClass(), "connection has been taken back");
        return;
      }
    }
    de.must.io.Logger.getInstance().info(getClass(), "Warning: could not assign a connection while take back request");
  }

  /**
   * Takes back a connection holder.
   * @param connectionToGiveBack the connection to give back.
   */
  public void takeBack(ConnectionHolder connectionHolderToGiveBack) {
  	try {
      if(!connectionHolderToGiveBack.getConnection().getAutoCommit()) connectionHolderToGiveBack.getConnection().rollback(); // doesn't do anything if application is well written but secures a initial state of the connection
    } catch(SQLException SQLe) {
      de.must.io.Logger.getInstance().error(getClass(), SQLe);
    }
    connectionHolderToGiveBack.unlock();
  }

  /**
   * Doubles the capacity of the ConnectionHolder array.
   * @param oldConnectionHolders the ConnectionHolder array whose capacity should be doubled
   * @return the capacity increased array
   */
  public synchronized ConnectionHolder[] doubleCapacity(ConnectionHolder[] oldConnectionHolders) {
    int i=0;
    int oldArrayCapacity = oldConnectionHolders.length;
    int newArrayCapacity = oldArrayCapacity * 2;
    ConnectionHolder[] newConnectionHolders = new ConnectionHolder[newArrayCapacity];
    while (i < oldArrayCapacity) {
      newConnectionHolders[i] = oldConnectionHolders[i];
      i++;
    }
    capacity = capacity * 2;
    return newConnectionHolders;
  }

	/**
	 * Cleans up the connection pool and removes no more valid connections.
	 */
	public void checkAndCleanUpPool() {
		boolean cleanUpNeccessary = false;
		for (int i  = 0; i < size; i++) {
			try {
				if (connectionHolders[i].getConnection() == null || connectionHolders[i].getConnection().isClosed()) {
					cleanUpNeccessary = true; 
				}
			} catch (SQLException e) {
				cleanUpNeccessary = true; 
			}
		}
		if (cleanUpNeccessary) {
			connectionHolders = cleanUp(connectionHolders);
		}
	}

	/**
	 * Cleans up the connection pool and removes no more valid connections.
	 * @param oldConnectionHolders the ConnectionHolder array
	 * @return the cleaned up array
	 */
	private synchronized ConnectionHolder[] cleanUp(ConnectionHolder[] oldConnectionHolders) {
		int i=0;
		int j=0;
		ConnectionHolder[] newConnectionHolders = new ConnectionHolder[oldConnectionHolders.length];
		while (i < size) {
      boolean available = false;
      try {
        available = connectionHolders[i].getConnection() != null && !oldConnectionHolders[i].getConnection().isClosed();
      } catch (SQLException e) {
      }
			if (available) {
				newConnectionHolders[j] = oldConnectionHolders[i];
				j++;
			}
			i++;
		}
		size = j;
		return newConnectionHolders;
	}

  /**
   * Closes all connections of the pool.
   */
  public synchronized void closeAllConnections() {
    for (int i = 0; i < size; i++) {
      connectionHolders[i].closeConnection();
    }
  }

  /**
   * Called by the garbage collector on an object when garbage collection
   * determines that there are no more references to the object.
   */
  protected void finalize() throws Throwable {
    closeAllConnections();
    super.finalize();
  }

}
