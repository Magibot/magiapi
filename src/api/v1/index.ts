import express from 'express';
import swagger from 'swagger-ui-express';

import auth from './routes/auth';
import guild from './routes/guild';
import playlist from './routes/playlist';
import song from './routes/song';

const router = express.Router({ mergeParams: true });

// Require the swagger document
import document from './swagger.json';

const { title, version } = document.info;
const docsPageTitle = `${title} v${version}`;
router.use(
  '/docs',
  swagger.serve,
  swagger.setup(document, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: docsPageTitle
  })
);

router.use('/auth', auth);
router.use('/guilds', guild);
router.use('/playlists', playlist);
router.use('/song/:songId', song);

export default router;
