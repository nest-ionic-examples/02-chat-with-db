db.createUser({
  user: 'chat-admin',
  pwd: 'password123',
  roles: [{role: 'dbAdmin', db: 'chat'}]
}); // <1>
