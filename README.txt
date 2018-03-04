Мой модуль логгирования myecho
	 * Лог будет записан в файл log4js.log, а так-же показан в терминале - by default.
	 * Если послан integer в аргументе, то, 
	 * -1 - не посылать в файл,
	 *  0 - не выводить в терминал
	 * Следующие значения установят file logger mode. Если не указано - debug by default
	 * "trace", "debug", "info", "warn", "error", "fatal", "off"
	 * 
     * Построено на основе stack-trace и log4js logger
     * https://www.npmjs.com/package/stack-trace
     * https://www.npmjs.com/package/log4js
     * 
	 * Использовано резервирование контента с self = this
     * Javascript constructor

	// var modulestack = require('../../node_modules/myecho');
	// var stack = new modulestack();

	// stack.echo('error', 'app.post(/upload\n', 'Проверяем 24 прогон', req.file, 0);
	// stack.echo('Проверяем 25 прогон');