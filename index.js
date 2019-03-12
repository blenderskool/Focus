const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(express.static(__dirname + '/public'));
app.use(cors());
app.use(bodyParser.json());

let connection;
(async () => {
  try {
    connection = await mysql.createConnection({
      host: 'localhost',
      port: 3333,
      user: 'root',
      password: 'root',
      database: 'focus-todo'
    });
  }
  catch (err) {
    console.log('Connection to database failed!');
    console.log(err);
  }
})();


app.listen(3000, () => {
  console.log('Server running on port 3000');
});


async function tasksAdd(task, collection) {

  try {
    /**
     * Insert a new task as part of given collection
     */
    await connection.query('INSERT INTO tasks (task, collection) VALUES (?, ?)', [task, collection]);
    /**
     * Update the tasks count of the collection
     */
    await connection.query('UPDATE collections SET tasks = (SELECT COUNT(*) FROM tasks WHERE collection = ?) WHERE id = ?', [collection, collection]);

    /**
     * Get the data of the last inserted task
     */
    const [ results ] = await connection.query('SELECT LAST_INSERT_ID() FROM tasks', []);

    return {
      task: task,
      id: results[0]['LAST_INSERT_ID()'],
      is_complete: false
    }
  }
  catch (err) {
    return { err };
  }

}

// /tasks/ API that makes changes to the 'tasks' table in the database

/**
 * Adds a task to the table.
 * Expects body as {
 *   task: 'Task Name',
 *   collection: <Collection_ID>
 * }
 */
app.post('/tasks/add', async (req, res) => res.json(await tasksAdd(req.body.task, req.body.collection)));

/**
 * Gets all the tasks of specific collection.
 * Request should be made as GET /tasks?collection=<Collection_ID>
 */
app.get('/tasks/', async (req, res) => {

  try {
    const [ results ] = await connection.query('SELECT * FROM tasks where collection = ?', [req.query.collection]);

    res.json(results);
  }
  catch (err) {
    res.json({ err });
  }

});

/**
 * Deletes a specific task
 */
app.delete('/tasks/:id', async (req, res) => {

  try {
  
    const [ results ] = await connection.query('SELECT collection FROM tasks WHERE id = ?', [req.params.id]);      
    const collection = results[0].collection;

    await connection.query('DELETE FROM tasks where id = ?', [req.params.id]);

    /**
     * Update the tasks count of the collection
     */
    await connection.query('UPDATE collections SET tasks = tasks - 1 WHERE id = ?', [collection]);

    res.json({
      message: 'Item deleted successfully'
    });
  }
  catch (err) {
    res.json({ err });
  }

});

/**
 * Updates the is_complete state of specific task.
 * Current implementation just toggles the is_complete value of the task
 */
app.post('/tasks/:id/update', async (req, res) => {

  try {
    await connection.query('UPDATE tasks SET is_complete = 1 - is_complete WHERE id = ?', [req.params.id]);

    res.json({
      message: 'Item updated successfully'
    });
  }
  catch (err) {
    res.json({ err });
  }

});

// /collections/ API that makes changes to the 'collections' table in the database

/**
 * Adds a collection to the table
 * Expects a body as {
 *   name: 'Collection Name'
 * }
 */
app.post('/collections/add', async (req, res) => {

  try {
    /**
     * Insert a new collection
     */
    await connection.query('INSERT INTO collections (name) VALUES (?)', [req.body.name]);

    /**
     * Get the data of the last inserted collection
     */
    const [ results ] = await connection.query('SELECT LAST_INSERT_ID() FROM collections', []);

    res.json({
      name: req.body.name,
      id: results[0]['LAST_INSERT_ID()'],
      tasks: 0
    });
  }
  catch (err) {
    res.json({ err });
  }

});

/**
 * Gets all the collections
 */
app.get('/collections/', async (req, res) => {

  try {

    const [results, tasksComplete] = await Promise.all([
      connection.query('SELECT * FROM collections'),

      /**
       * Gets the count of tasks completed in each collection
       */
      connection.query('SELECT COUNT(*), collection FROM tasks WHERE is_complete = 1 GROUP BY collection')
    ]);

    /**
     * Merge the completed tasks count with the collection data
     */
    results[0].forEach(result => {
      const task = tasksComplete[0].find(task => task.collection === result.id);
      if (!task) return;

      result.tasks_complete = task['COUNT(*)'];
    });
    res.json(results[0]);
  }
  catch (err) {
    res.json({ err });
  }

});

/**
 * Deletes a specific collection and it's included tasks
 */
app.delete('/collections/:id', async (req, res) => {

  try {
    await Promise.all([

      /**
       * Delete the collection
       */
      connection.query('DELETE FROM collections where id = ?', [req.params.id]),

      /**
       * Delete all the tasks which are a part of that collection
       */
      connection.query('DELETE FROM tasks where collection = ?', [req.params.id])
    ]);

    res.json({
      message: 'Collection deleted successfully'
    });
  }
  catch (err) {
    res.json({ err });
  }

});