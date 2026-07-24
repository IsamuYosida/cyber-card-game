export const attackCards = [
  // Одиночные атаки (10 штук)
  { id: 'a1', name: 'Фишинговая атака', type: 'single', characteristics: ['informationSecurity'], damage: 1, description: 'Обманные письма, которые выманивают у сотрудников логины и пароли от рабочих аккаунтов.' },
  { id: 'a2', name: 'Утечка данных', type: 'single', characteristics: ['informationSecurity'], damage: 1, description: 'Случайное или намеренное копирование секретных баз данных компании во внешний интернет.' },
  { id: 'a3', name: 'DDoS-атака', type: 'single', characteristics: ['technologyInfrastructure'], damage: 1, description: 'Лавина ложных запросов, которая полностью парализует работу сайта и внутренних серверов.' },
  { id: 'a4', name: 'Сбой из-за legacy-кода', type: 'single', characteristics: ['technologyInfrastructure'], damage: 1, description: 'Атака на устаревшее ПО, которое компания вовремя не обновила, вызвавшая в итоге отказ систем.' },
  { id: 'a5', name: 'Программы-вымогатели', type: 'single', characteristics: ['financialStability'], damage: 1, description: 'Вирус шифрует все файлы компании и требует огромный выкуп в биткоинах.' },
  { id: 'a6', name: 'CEO-мошенничество', type: 'single', characteristics: ['financialStability'], damage: 1, description: 'Письмо от лица директора с требованием срочно перевести деньги "секретному контрагенту".' },
  { id: 'a7', name: 'Промышленный шпионаж', type: 'single', characteristics: ['innovationAbility'], damage: 1, description: 'Хакеры воруют чертежи или код нового продукта, лишая компанию уникального преимущества.' },
  { id: 'a8', name: 'Новый патент', type: 'single', characteristics: ['innovationAbility'], damage: 1, description: 'Кража чертежей до подачи заявки, чтобы зарегистрировать технологию на подставную фирму.' },
  { id: 'a9', name: 'Дефейс сайта', type: 'single', characteristics: ['reputation'], damage: 1, description: 'Взлом главной страницы сайта с заменой контента.' },
  { id: 'a10', name: 'Атака ботов', type: 'single', characteristics: ['reputation'], damage: 1, description: 'Наводнение страниц компании тысячами фейковых негативных отзывов от ботов.' },
  

  // Двойные атаки (20 штук)
  //Информационная безопасность + все
  { id: 'a11', name: 'Руткиты', type: 'double', characteristics: ['informationSecurity', 'technologyInfrastructure'], damage: 2, description: 'Глубокое заражение ядра системы, скрывающее вирус от антивирусов и дающее полный контроль над сетью. ' },
  { id: 'a12', name: 'Инъекции кода', type: 'double', characteristics: ['informationSecurity', 'technologyInfrastructure'], damage: 2, description: 'Внедрение команд в поля сайта, позволяющее качать базу данных и ломать логику веб-приложений. ' },
  { id: 'a13', name: 'Скимминг', type: 'double', characteristics: ['informationSecurity', 'financialStability'], damage: 2, description: 'Считывание данных банковских карт клиентов прямо с терминалов или через взломанные формы оплаты.' },
  { id: 'a14', name: 'Криптоджекинг', type: 'double', characteristics: ['informationSecurity', 'financialStability'], damage: 2, description: 'Скрытая установка майнеров, которая тратит ресурсы серверов и накручивает счета за электричество.' },
  { id: 'a15', name: 'Доксинг', type: 'double', characteristics: ['informationSecurity', 'reputation'], damage: 2, description: 'Слив в открытый доступ личной переписки, фото и документов руководства компании.' },
  { id: 'a16', name: 'Компрометация данных', type: 'double', characteristics: ['informationSecurity', 'reputation'], damage: 2, description: 'Кража и публикация личных данных клиентов, разрушающая доверие к бренду.' },
  { id: 'a17', name: 'Атака на цепочку поставок', type: 'double', characteristics: ['informationSecurity', 'innovationAbility'], damage: 2, description: 'Взлом мелкого подрядчика ради кражи секретных технологий его крупного заказчика.' },
  { id: 'a18', name: 'Угроза ИИ-моделям', type: 'double', characteristics: ['informationSecurity', 'innovationAbility'], damage: 2, description: 'Незаметное изменение обучающих данных нейросети, из-за чего ИИ начинает выдавать ошибки.' },
  //Технологии + остаток
  { id: 'a19', name: 'Удаление Бэкапов', type: 'double', characteristics: ['technologyInfrastructure', 'financialStability'], damage: 2, description: 'Целенаправленное уничтожение резервных копий, требующее огромных затрат на восстановление с нуля.' },
  { id: 'a20', name: 'Логическая бомба', type: 'double', characteristics: ['technologyInfrastructure', 'financialStability'], damage: 2, description: 'Скрытый код, который активируется в день «Х» и физически выводит из строя серверное оборудование.' },
  { id: 'a21', name: 'Саботаж обновлений', type: 'double', characteristics: ['technologyInfrastructure', 'innovationAbility'], damage: 2, description: 'Подмена файла официального обновления ПО на вирус, блокирующий выпуск новых технологических патчей.' },
  { id: 'a22', name: 'Атака на тестовые стенды', type: 'double', characteristics: ['technologyInfrastructure', 'innovationAbility'], damage: 2, description: 'Взлом лабораторий разработки, уничтожающий среду для тестирования новых ИТ-продуктов.' },
  { id: 'a23', name: 'Перехват', type: 'double', characteristics: ['technologyInfrastructure', 'reputation'], damage: 2, description: 'Изменение маршрутов интернета, из-за чего пользователи вместо сайта компании попадают на иной ресурс' },
  { id: 'a24', name: 'Атака на DNS-сервер', type: 'double', characteristics: ['technologyInfrastructure', 'reputation'], damage: 2, description: 'Подмена адреса компании, ломающая доступ к сервисам и пугающая клиентов ошибками безопасности.' },
  //Финансы и что-там-еще-осталось 
  { id: 'a25', name: 'Краудфандинговый скам', type: 'double', characteristics: ['financialStability', 'reputation'], damage: 2, description: 'Взлом кошельков краудфандинга, кража денег инвесторов и публичный провал крауд-кампании' },
  { id: 'a26', name: 'Подделка чеков', type: 'double', characteristics: ['financialStability', 'reputation'], damage: 2, description: 'Перехват финансовых документов и замена реквизитов, ведущая к потере денег и судам с партнерами.' },
  { id: 'a27', name: 'Подкуп разработчиков', type: 'double', characteristics: ['financialStability', 'innovationAbility'], damage: 2, description: 'Подкуп или взлом разработчиков с целью продажи прототипов прямым конкурентам.' },
  { id: 'a28', name: 'Блокировка R&D отдела', type: 'double', characteristics: ['financialStability', 'innovationAbility'], damage: 2, description: 'Шифрование серверов исследователей, срывающее сроки выпуска инноваций и сжигающее бюджет.' },
  //Инновации и Репутация. Укуси меня пчола
  { id: 'a29', name: 'Фейковый релиз', type: 'double', characteristics: ['innovationAbility', 'reputation'], damage: 2, description: 'Публикация фальшивого анонса о «провальных» технологиях компании, созданная с помощью дипфэйков.' },
  { id: 'a30', name: 'Слив недоработанной Альфа-версии', type: 'double', characteristics: ['innovationAbility', 'reputation'], damage: 2, description: 'Кража сырого билда игры/программы и его публикация, из-за чего пользователи считают продукт мусором.' },

  // И В ОБРАТНУЮ СТОРОНУ ПАААААААААААШЛИ. ПРОВЕРЬ ТЕКСТ ПОЖАЛУЙСТА
  {id: 'a31', name: 'Взлом через IoT-устройства', type: 'double', characteristics: ['technologyInfrastructure', 'informationSecurity'], damage: 2, description: 'Атака на «умные» приборы в офисе, ломают их сеть'},
  {id: 'a32', name: 'Атака на гипервизор', type: 'double', characteristics: ['technologyInfrastructure', 'informationSecurity'], damage: 2, description: 'Взлом серверной виртуальной машины, позволяющий хакеру выбраться из изолированной среды и украсть данные других систем.'},
  {id: 'a33', name: 'Взлом эквайринга', type: 'double', characteristics: ['financialStability', 'informationSecurity'], damage: 2, description: 'Атака на банковский шлюз сайта, которая выкачивает полные анкеты клиентов с паролями.'},
  {id: 'a34', name: 'Фиктивное трудоустройство', type: 'double', characteristics: ['financialStability', 'informationSecurity'], damage: 2, description: 'Внедрение шпиона в штат ради получения им легального доступа к секретным архивам.'},
  {id: 'a35', name: 'Уязвимость смарт-контрактов', type: 'double', characteristics: ['innovationAbility', 'informationSecurity'], damage: 2, description: 'Ошибка в инновационном блокчейн-коде компании, которая позволяет обнулить приватные ключи пользователей.'},
  {id: 'a36', name: 'Теневой ИИ', type: 'double', characteristics: ['innovationAbility', 'informationSecurity'], damage: 2, description: 'Сотрудники загружают секретные документы в публичные нейросети для анализа, случайно рассекречивая данные.'},
  {id: 'a37', name: 'Целевой фишинг через амбассадоров', type: 'double', characteristics: ['reputation', 'informationSecurity'], damage: 2, description: 'Взлом аккаунта известного блогера-партнера и от его лица отправляется вирусы сотрудникам компании.'},
  {id: 'a38', name: 'Fake Bounty', type: 'double', characteristics: ['reputation', 'informationSecurity'], damage: 2, description: 'Мошенники публично заявляют об уязвимости компании и в ходе «демонстрации» выманивают у техподдержки реальные доступы.'},
  {id: 'a39', name: 'Блокировка из-за неуплаты ПО', type: 'double', characteristics: ['financialStability', 'technologyInfrastructure'], damage: 2, description: 'Отмена всех подписок на критически важный софт, из-за чего отключаются серверы.'},
  {id: 'a40', name: 'Атака на транзакции', type: 'double', characteristics: ['financialStability', 'technologyInfrastructure'], damage: 2, description: 'Множество одновременных микропереводов, которые перегружают и полностью отключают банковские процессоры.'},
  {id: 'a41', name: 'Конфликт микросервисов', type: 'double', characteristics: ['innovationAbility', 'technologyInfrastructure'], damage: 2, description: 'Внедрение новой сырой фичи, которая из-за бага начинает бесконечно перезагружать соседние стабильные серверы.'},
  {id: 'a42', name: 'Атака на квантовое шифрование', type: 'double', characteristics: ['innovationAbility', 'technologyInfrastructure'], damage: 2, description: 'Экспериментальный метод защиты данных дает сбой, намертво блокируя доступ администраторов к управлению сетью.'},
  {id: 'a43', name: 'Флешмоб-наплыв', type: 'double', characteristics: ['reputation', 'technologyInfrastructure'], damage: 2, description: 'Вирусный фейк о «бесплатной раздаче» вызывает лавину реальных юзеров, которая случайно сжигает серверы компании.'},
  {id: 'a44', name: 'Взлом аккаунтов администраторов', type: 'double', characteristics: ['reputation', 'technologyInfrastructure'], damage: 2, description: 'Публичный угон админских прав в соцсетях, через которые внедряют вредоносные скрипты во внутреннюю сеть.'},
  {id: 'a45', name: 'Патентная ловушка', type: 'double', characteristics: ['innovationAbility', 'financialStability'], damage: 2, description: 'Конкуренты взламывают базу идей, регистрируют инновацию на себя и выставляют компании огромный судебный иск.'},
  {id: 'a46', name: 'Штраф за «грязные» технологии', type: 'double', characteristics: ['innovationAbility', 'financialStability'], damage: 2, description: 'Использование несертифицированного алгоритма, защищенность которого взломали регуляторы, наложив миллионные штрафы.'},
  {id: 'a47', name: 'Атака на акции', type: 'double', characteristics: ['reputation', 'financialStability'], damage: 2, description: 'Вброс скоординированной дезинформации о взломе компании, вызывающий панику на бирже и обвал стоимости активов.'},
  {id: 'a48', name: 'Бойкот платежных систем', type: 'double', characteristics: ['reputation', 'financialStability'], damage: 2, description: 'Манипуляция общественным мнением, из-за которой платежные системы временно блокируют счета компании до выяснения.'},
  {id: 'a49', name: 'Дискредитация ИИ-ассистента', type: 'double', characteristics: ['reputation', 'innovationAbility'], damage: 2, description: 'Корпоративный чат-бот дает клиентам опасные или оскорбительные советы, закрывая проект.'},
  {id: 'a50', name: 'Обвинение в плагиате', type: 'double', characteristics: ['reputation', 'innovationAbility'], damage: 2, description: 'Подделка цифровых подписей на коде, из-за чего уникальная инновация компании выглядит как воровство.'},
  // Карта с выбором (2 штуки, а то не выпадет никогда)
  { id: 'a51', name: 'Точечная атака', type: 'choose', characteristics: [], damage: 1, description: 'Вам под силу все! Выберите характеристику для атаки' },
  { id: 'a52', name: 'Точечная атака', type: 'choose', characteristics: [], damage: 1, description: 'Вам под силу все! Выберите характеристику для атаки' }
];
//Думаю, хватит. Нужно протестировать. На край, действительно сделаем перемешивание, но карт в два раза больше