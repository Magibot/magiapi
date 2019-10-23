import express from 'express';

// Models
import Guild from '../../models/guild.model';

// Middlewares
import authInterceptor from '../../middleware/auth.interceptor';

// Helpers
import ApiResponse from '../../app/api.response';
import exceptionHandler from '../../helpers/general.exception.handler';

const router = express.Router();

// Use authentication interceptor to protect the routes of guild
router.use(authInterceptor);

router.post('/', async (request, response) => {
  const apiResponse = new ApiResponse();
  try {
    const guild = await Guild.create(request.body);
    apiResponse.setPayload({ guild });
    response.status(201).json(apiResponse.json());
  } catch (err) {
    const { statusCode, jsonResponse } = exceptionHandler(err);
    return response.status(statusCode).json(jsonResponse);
  }
});

export default router;
