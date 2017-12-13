const Application = require('koa');
const bodyParser = require('koa-bodyparser');
const axios = require('axios');

const botId = '458384630:AAFjoNytjMLqw-UAyqAmvNMZ2TtjdUhThUs';

const app = new Application();

app
  .use(bodyParser())
  .use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      console.log(err);
    } finally {
      ctx.body = '';
    }
  })
  .use(async (ctx, next) => {
    if (ctx.url !== '/new-message' || ctx.method !== 'POST') {
      return next();
    }

    console.log(ctx.request.body);

    if (!ctx.request.body.inline_query) {
      return next();
    }

    const {
      inline_query: {
        id: queryId,
        query
      }
    } = ctx.request.body;

    await axios.post(`https://api.telegram.org/bot${botId}/answerInlineQuery`, {
      inline_query_id: queryId,
      next_offset: '',
      results: []
    });

    await next();
  })
  .listen(process.env.PORT, () => {
    console.log(`Telegram app listening on port ${process.env.PORT}!`);
  });
