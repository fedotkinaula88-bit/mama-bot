const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });
const playersState = {};

const gameConfig = {
    mamas: {
        matematik: {
            name: "📞 ОБЪЕКТ №1",
            steps: [
                {
                    question: "🎙 *Раунд 1:* \n«90 уроков?! У конкурентов 30 занятий в 3 раза дешевле. Почему я должна переплачивать?»",
                    options: [
                        { text: "«Елена, пакет 90 уроков — это максимальная скидка 25%. За 6 месяцев ребёнок закрывает уровень. Считаем КПД?»", isCorrect: true, reply: "✅ *ПОБЕДА!* Чистый ROI — то, что нужно математику." },
                        { text: "«Елена, у нас весело! Ребёнок будет светиться, квесты по Minecraft — это восторг!»", isCorrect: false, reply: "❌ *СЛИВ:* Эмоции вместо калькулятора." },
                        { text: "«Елена, методика лицензирована по международной сетке CEFR и Кембриджскому стандарту».", isCorrect: false, reply: "❌ *СЛИВ:* Ты ушёл в 'Маму-Программу', клиент спросил про деньги." }
                    ]
                },
                {
                    question: "🎙 *Раунд 2:* \n«Выкатить всю сумму за 90 уроков сразу не могу, нет такого бюджета».",
                    options: [
                        { text: "«Елена, есть внутренняя рассрочка без банков! Делим платёж, сохраняем скидку 25%, видим баланс в приложении».", isCorrect: true, reply: "✅ *ПОБЕДА!* Аргумент про контроль бюджета." },
                        { text: "«Елена, это вложение в счастье! Ребёнок будет получать звёздочки и призы, цена отойдёт на второй план».", isCorrect: false, reply: "❌ *СЛИВ:* Мама про бюджет, а ты про звёздочки." },
                        { text: "«Пакет меньше прервёт Кембриджский трек и нарушит системность обучения по CEFR».", isCorrect: false, reply: "❌ *СЛИВ:* Ты давишь методикой, а ей нужно решить вопрос с деньгами." }
                    ]
                },
                {
                    question: "🎙 *Раунд 3:* \n«А вдруг вы закроетесь через месяц? Где гарантии, что вы не однодневка?»",
                    options: [
                        { text: "«Мы на рынке 9 лет. Оплата на расчётный счёт, чеки. Баланс в приложении. Если что — возврат за неиспользованные уроки».", isCorrect: true, reply: "🏆 *СДЕЛКА ЗАКРЫТА!* Юридическая броня." },
                        { text: "«Мы любим учеников! У нас красивое приложение с комиксами, разве мошенники стали бы делать такое?»", isCorrect: false, reply: "❌ *СЛИВ:* 'Любовь' не заменяет расчётный счёт." },
                        { text: "«Гарантия — наша лицензия и оцифрованный прогресс по академическим юнитам».", isCorrect: false, reply: "❌ *СЛИВ:* Методика не гарантирует безопасность кошелька." }
                    ]
                }
            ]
        },
        emotsiya: {
            name: "📞 ОБЪЕКТ №2",
            steps: [
                {
                    question: "🎙 *Раунд 1:* \n«Сын 12 лет, орёт 'не хочу'. Ваши 90 уроков — это домашний ад».",
                    options: [
                        { text: "«Ирина, мы зайдём на его территорию! Уроки вокруг Minecraft и Roblox — для него это игра».", isCorrect: true, reply: "✅ *ПОБЕДА!* Геймификация — лучший друг Эмоции." },
                        { text: "«Зато это экономит 25% бюджета и даёт бесплатные часы практики».", isCorrect: false, reply: "❌ *СЛИВ:* Ей плевать на скидки, когда дома война." },
                        { text: "«У нас строгий контроль и рамки, преподаватель умеет держать дисциплину».", isCorrect: false, reply: "❌ *СЛИВ:* Ты напугал маму ещё большими рамками." }
                    ]
                },
                {
                    question: "🎙 *Раунд 2:* \n«Эффект новизны пройдёт, начнётся грамматика — он скажет, что это скучно, и бросит».",
                    options: [
                        { text: "«Сюжет в приложении постоянно меняется! Он делает домашки ради звёздочек и призов, а сложность квестов растёт вместе с ним».", isCorrect: true, reply: "✅ *ПОБЕДА!* Продал игровой азарт." },
                        { text: "«Пакет 90 уроков — самый выгодный, даже если он будет заниматься реже».", isCorrect: false, reply: "❌ *СЛИВ:* Снова математика там, где нужны эмоции." },
                        { text: "«У нас спиральная система, которая чередует Past и Present Simple для памяти».", isCorrect: false, reply: "❌ *СЛИВ:* Она боится, что он бросит, а ты про учебный план." }
                    ]
                },
                {
                    question: "🎙 *Раунд 3:* \n«Придётся стоять над ним с палкой? У меня нет сил».",
                    options: [
                        { text: "«Не нужно! Система сама тащит его азартом. Вы просто смотрите прогресс в приложении, пока пьёте кофе».", isCorrect: true, reply: "🏆 *СДЕЛКА ЗАКРЫТА!* Сняла с мамы роль надзирателя." },
                        { text: "«Можем разбить оплату, если не потянете контроль — вернём деньги».", isCorrect: false, reply: "❌ *СЛИВ:* Рассрочка не отменяет ссоры с сыном." },
                        { text: "«За вас это делает CRM-система, каждые 12 уроков мы проводим аудит юнитов».", isCorrect: false, reply: "❌ *СЛИВ:* Ты предложил ей работу, от которой она бежит." }
                    ]
                }
            ]
        }
    }
};

// Функция перемешивания (алгоритм Фишера-Йетса)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    playersState[chatId] = { mama: null, step: 0, options: [] };
    bot.sendMessage(chatId, "🔥 *ОПЕРАЦИЯ 90 УРОКОВ* 🔥\nВыбери объект:", {
        reply_markup: { inline_keyboard: Object.keys(gameConfig.mamas).map(k => [{ text: gameConfig.mamas[k].name, callback_data: `m_${k}` }]) }
    });
});

bot.on('callback_query', (q) => {
    const chatId = q.message.chat.id;
    const data = q.data;

    if (data.startsWith('m_')) {
        playersState[chatId].mama = data.split('_')[1];
        playersState[chatId].step = 0;
        sendStep(chatId);
    } else if (data.startsWith('a_')) {
        const idx = parseInt(data.split('_')[1]);
        const state = playersState[chatId];
        const option = state.options[idx];

        if (option.isCorrect) {
            state.step++;
            if (state.step >= gameConfig.mamas[state.mama].steps.length) {
                bot.sendMessage(chatId, "🎉 *ВЫ ПРОФИ! СДЕЛАЛИ ВСЕХ!*");
            } else {
                bot.sendMessage(chatId, option.reply, { reply_markup: { inline_keyboard: [[{ text: "⏭ Далее", callback_data: "next" }]] } });
            }
        } else {
            bot.sendMessage(chatId, option.reply, { reply_markup: { inline_keyboard: [[{ text: "🔄 Сначала", callback_data: `m_${state.mama}` }]] } });
        }
    } else if (data === 'next') {
        sendStep(chatId);
    }
});

function sendStep(chatId) {
    const state = playersState[chatId];
    const stepData = gameConfig.mamas[state.mama].steps[state.step];
    
    // Перемешиваем варианты перед отправкой
    state.options = shuffle([...stepData.options]);
    
    let text = `${stepData.question}\n\n`;
    const buttons = state.options.map((opt, i) => {
        text += `*Вариант №${i+1}:* ${opt.text}\n\n`;
        return [{ text: `Выбрать №${i+1}`, callback_data: `a_${i}` }];
    });

    bot.sendMessage(chatId, text, { parse_mode: "Markdown", reply_markup: { inline_keyboard: buttons } });
}
