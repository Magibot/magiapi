import express from 'express';
import swagger from 'swagger-ui-express';

import auth from './routes/auth';
import guild from './routes/guild';

const router = express.Router({ mergeParams: true });

// Require the swagger document
const document = require('./swagger.json');
router.use('/docs', swagger.serve, swagger.setup(document, { customCss: '.swagger-ui .topbar { display: none }' }));

router.use('/auth', auth);
router.use('/guilds', guild);

export default router;
