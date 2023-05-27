import knex from "knex";
import connection from "../../../db";

/**
 * An abstract class representing an Entity.
 *
 * @abstract
 * @class Entity
 */
abstract class Entity {
  protected tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  /**
   * Create a new Entity in the database.
   *
   * @param {Object} data - The data to insert into the Entity.
   * @returns {number} The ID of the newly created Entity.
   * @memberof Entity
   */
  public async create(data: any): Promise<number> {
    const ids = await connection(this.tableName).insert(data, "id");
    return ids[0].id;
  }

  /**
  * Get all Entities of this type.
  *
  * @returns {Array} An array of all Entities of this type.
  * @memberof Entity
  */
  public async getAll(): Promise<Array<this>>;
  public async getAll<T>(): Promise<Array<T>> {
    return await connection(this.tableName).select("*");
  }

  /**
   * Get an Entity by its ID.
   *
   * @param {number} id - The ID of the Entity to retrieve.
   * @returns {Object} The Entity with the specified ID.
   * @memberof Entity
   */
  public async getById(id: string): Promise<this>;
  public async getById(id: number): Promise<this>;
  public async getById<T>(id: any): Promise<T> {
    const _id = Number(id);
    console.log(`Entity getById - tableName: ${this.tableName}, id: ${id}, _id: ${_id}`);
    return await connection(this.tableName).where({ id: _id }).first();
  }
  
  /**
   * Update an Entity by its ID.
   *
   * @param {number} id - The ID of the Entity to update.
   * @param {Object} data - The data to update the Entity with.
   * @returns {void}
   * @memberof Entity
   */
  public async update(id: string, data: any): Promise<void>;
  public async update(id: number, data: any): Promise<void>;
  public async update(id: any, data: any): Promise<void> {
    const _id = Number(id);
    return await connection(this.tableName).where({ id: _id }).update(data);
  }

  /**
   * Delete an Entity by its ID.
   *
   * @param {number} id - The ID of the Entity to delete.
   * @returns {void}
   * @memberof Entity
   */
  public async delete(id: string): Promise<void>;
  public async delete(id: number): Promise<void>;
  public async delete(id: any): Promise<void> {
    const _id = Number(id);
    return await connection(this.tableName).where({ id: _id }).del();
  }

  /**
   * Find an Entity by a specified key and value.
   *
   * @param {string} key - The key to search by.
   * @param {any} value - The value to search for.
   * @returns {Object} The Entity with the specified key and value.
   * @memberof Entity
   */
  public async findBy(key: string, value: any): Promise<this>;
  public async findBy<T>(key: string, value: any): Promise<T> {
    return await connection(this.tableName)
      .where({ [key]: value })
      .first();
  }

  /**
   * Find an Entity that matches a specified condition.
   *
   * @param {object} condition - The condition to search for.
   * @returns {Object} The Entity that matches the specified condition.
   * @memberof Entity
   */
  public async findOne(condition: object): Promise<this>;
  public async findOne<T>(condition: object): Promise<T> {
    return (await connection(this.tableName).where(condition).first()) as T;
  }
}

export default Entity;
