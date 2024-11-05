export const up = (pgm) => {
    pgm.createTable('users', {
      id: 'id',
      name: { type: 'varchar(1000)', notNull: true },
      createdAt: {
        type: 'timestamp',
        notNull: true,
        default: pgm.func('current_timestamp'),
      },
    });
    pgm.createTable('posts', {
      id: 'id',
      userId: {
        type: 'integer',
        notNull: true,
        references: '"users"',
        onDelete: 'cascade',
      },
      body: { type: 'text', notNull: true },
      createdAt: {
        type: 'timestamp',
        notNull: true,
        default: pgm.func('current_timestamp'),
      },
    });
    pgm.createIndex('posts', 'userId');
  };

  export const down = (pgm) => {
    // Drop the index on the 'posts' table first
    pgm.dropIndex('posts', 'userId');
    
    // Drop the 'posts' table (with cascading on foreign keys)
    pgm.dropTable('posts', { ifExists: true, cascade: true });
  
    // Drop the 'users' table
    pgm.dropTable('users', { ifExists: true, cascade: true });
  };