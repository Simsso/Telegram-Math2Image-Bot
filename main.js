const Telegraf = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

const samples = [
    'e^{i\\pi }+1=0', 
    'E=mc^2', 
    '{ \\partial^2 u \\over \\partial t^2 } = c^2 \\nabla^2 u ', 
    ' u(x,t) = \\int_{-\\infty}^\\infty s(\\omega) u_\\omega(x,t) d\\omega ',
    '{\\frac {1}{81{\\sqrt {\\pi }}}}\\left({\\frac {Z}{a_{0}}}\\right)^{\\frac {3}{2}}\\left(6-{\\frac {Zr}{a_{0}}}\\right){\\frac {Zr}{a_{0}}}e^{-\\textstyle {\\frac {Zr}{3a_{0}}}}\\sin \\theta e^{\\pm i\\phi }',
    '\\frac{\\partial}{\\partial\\theta}\\frac{1}{\\lvert\\mathcal{Y}_j\\rvert}\\sum_{y_i\\in\\mathcal{Y}_j}\\mathcal{L}\\left(f_{\\theta,j}(x_i),y_i\\right)',
    '\\sum _{n=0}^{\\infty }{\\frac {f^{(n)}(a)}{n!}}\\,(x-a)^{n}'
];

/**
 * Converts a TeX math expression into the URL that delivers the corresponding jpeg image with a padding of 50px.
 * @param {string} tex TeX math expression
 */
function getImageURL(tex) {
    return 'https://timodenk.com/api/tex2img/' + encodeURIComponent(tex) + '?padding=50&format=jpg'
}

/**
 * Bot "Start" /start
 * Called if somebody contacts the bot for the first time or sends the command /start.
 */
bot.start((ctx) => {
    console.log('started:', ctx.from.id)
    return ctx.reply('Welcome to the Math Drawing Bot! \nSend equations like "E=mc^2" or "e^{i\\pi }+1=0" and get I will send a nicely drawed picture back. You can also request a /sample.')
});

/**
 * Users can request samples with the command /sample.
 */
bot.command('sample', (ctx) => {
    const sample = samples[Math.floor(Math.random() * samples.length)];
    ctx.reply(sample)
    return Promise.all([
        sendEquation(ctx, sample)
    ]);
});

/**
 * Normal message, i.e. convert math expression to image task.
 */
bot.on('message', (ctx) => {
    if (typeof ctx.message.text !== 'string') return;
    return Promise.all([
        sendEquation(ctx, ctx.message.text)
    ]);
});

/**
 * Sends a rendered version of the given expression to the given context.
 * @param {*} ctx Telegraf conversation context
 * @param {string} equation TeX math expression
 */
function sendEquation(ctx, equation) {
    ctx.replyWithPhoto(getImageURL(equation))
}

/**
 * Bot inline capabilities. Users can call the bot inline with @math2img_bot <expression>.
 * The bot responds with one suggested images, i.e. the rendered expression.
 */
bot.on('inline_query', async ({ inlineQuery, answerInlineQuery }) => {
    let photoURL = getImageURL(inlineQuery.query);
    return answerInlineQuery([
        {
            type: 'photo',
            id: 1,
            photo_url: photoURL,
            thumb_url: photoURL
        }
    ])
})

// start bot
bot.startPolling();