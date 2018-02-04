/**
 * storage
 */

/* Node modules */

/* Third-party modules */
import Queue from 'better-queue';
import storage from 'electron-json-storage';

/* Files */

export default class Storage {
  constructor(key) {
    this.key = key;

    /* Set the queue - this just executes function with callback */
    this.queue = new Queue((fn, cb) => fn(cb));
  }

  /**
   * Add To Queue
   *
   * Adds a new task to the process queue. This
   * exists to avoid errors when accessing the
   * file - you could get errors when performing
   * an update (a get followed by a set) as it
   * would try accessing the file multiple ways
   * at the same time.
   *
   * @param {function} fn
   * @return {Promise<*>}
   */
  addToQueue(fn) {
    return new Promise((resolve, reject) => {
      this.queue.push(fn, (err, result) => {
        if (err) {
          return reject(err);
        }

        return resolve(result);
      });
    });
  }

  /**
   * Delete
   *
   * Deletes a value from the object
   *
   * @param {string} key
   * @param {*} opts
   * @returns {Promise<void>}
   */
  delete(key, opts) {
    return this.get(opts)
      .then((json) => {
        delete json[key];

        return this.set(json, opts);
      });
  }

  /**
   * Get
   *
   * Gets all the data from the store
   *
   * @param {*} opts
   * @returns {Promise<object>}
   */
  get(opts) {
    return this.addToQueue(cb => storage.get(this.key, opts, cb));
  }

  /**
   * Remove All
   *
   * Removes the data file
   *
   * @param {*} opts
   * @returns {Promise<void>}
   */
  removeAll(opts) {
    return this.addToQueue(cb => storage.get(this.key, opts, cb));
  }

  /**
   * Set
   *
   * Saves the data
   *
   * @param {object} json
   * @param {*} opts
   * @returns {Promise<void>}
   */
  set(json, opts) {
    return this.addToQueue(cb => storage.set(this.key, json, opts, cb));
  }

  /**
   * Update
   *
   * Update (or adds) a value in the data object
   *
   * @param {string} key
   * @param {*} value
   * @param {*} opts
   * @returns {Promise<void>}
   */
  update(
    key,
    value,
    opts,
  ) {
    return this.get(opts)
      .then((result) => {
        /* Ensure an object */
        const json = result || {};

        json[key] = value;

        return this.set(json, opts);
      });
  }
}
