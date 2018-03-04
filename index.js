

/** 
	 * Мой модуль логгирования myecho
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
     * 
     * 
     * 
	*/
	// var modulestack = require('../../node_modules/myecho');
	// var stack = new modulestack();

	// stack.echo('error', 'app.post(/upload\n', 'Проверяем 24 прогон', req.file, 0);
	// stack.echo('Проверяем 25 прогон');


var stackTrace = require('stack-trace');
var path = require('path');
var log = require('npmlog');


var log4js = require('log4js');


var stackConfig = {
    info:"This is stackTrace module",
    loggerMode:"debug",
    operationMode:1
};


function Stack(){
    this.info = "This is stackTrace module";
    this.loggerMode = "debug";
    this.operationMode = 1; // -1 - не посылать в файл, 0 - не выводить в терминал
    
    this.init = function(){
        this.info = stackConfig.info;
        this.loggerMode = stackConfig.loggerMode;
        this.operationMode = stackConfig.operationMode;
    };
    
    
    
    this.echo = function(){

        this.init();

        var args, file, frame, line, method;


        /**
         * Получаем аррей переданных в метод this.echo параметров
         */
        args = 1 <= arguments.length ? Array.prototype.slice.call(arguments, 0) : [];
    
    
        /**
         * Поиск: передан ли logger mode. Передан, если в аррее существует один из аргументов 
         * в списке loggerModes. Найденное значение записывается в this.loggerMode
         */
        var loggerModes = ["trace", "debug", "info", "warn", "error", "fatal", "off"];
        var loggerModeFound = false;
        var self = this;

        
        var argscopy = [];
        
        var tmpFound = false;
        for (var i=0; i<args.length; i++) {

            tmpFound = false;

            /**
             * Проверка на integer - если есть такой
             * -1 - не посылать в файл,
	         *  0 - не выводить в терминал
             */
            if(typeof(args[i]) === 'number'){
                if(args[i] === -1)
                    this.operationMode = -1;
                else if(args[i] === 0){
                    this.operationMode = 0;
                }
                continue; // если число - продолжить на следующей итерации
            }


            /**
             * Поиск зарезервированного слова - мода
             */
            if(!loggerModeFound){
                loggerModes.forEach(function(entryMap){
                    if(entryMap == args[i]){
                        self.loggerMode = entryMap;
                        loggerModeFound = true;
                        tmpFound = true;
                        return; // stop forEach
                    }
                });
            }
            
            if(!tmpFound)
                argscopy.push(args[i]);
        }

        
      
        frame = stackTrace.get()[1];
        file = path.basename(frame.getFileName());
        line = frame.getLineNumber();
        method = frame.getFunctionName();
      
        /**
         * args предназначается для распечатки в терминале
         * argscopy предназначается для направление в файл-логгер
         * args и argscopy - отличаются лишь тем, что args содержит в теле логгер мод - 
         * как то "trace", "debug", "info", "warn", "error", "fatal", "off"
         * 
         */
        //args.unshift("" + file + ":" + line + " in " + method + "()");
        argscopy.unshift("" + file + ":" + line + " in " + method + "()");
    

        if(this.operationMode !== -1){
            this.info = JSON.stringify(argscopy);
            this.logItFile();
        }
        
        if(this.operationMode !== 0)
            return log.info.apply(log, argscopy); // changed 'debug' to canonical npmlog 'info'

    };



    this.logItFile = function(){
        log4js.configure({
            appenders: { cheese: { type: 'file', filename: 'log4js.log' } },
            categories: { default: { appenders: ['cheese'], level: 'error' } }
        });
        var logger = log4js.getLogger();
        logger.category = "FILElogger";
        logger.level = this.loggerMode;


        switch(this.loggerMode){
            case 'trace': logger.trace(this.info);
                break;
            case 'debug': logger.debug(this.info);
                break;
            case 'info': logger.info(this.info);
                break;
            case 'warn': logger.warn(this.info);
                break;
            case 'error': logger.error(this.info);
                break;
            case 'fatal': logger.fatal(this.info);
                break;
            case 'off': logger.off(this.info);
                break;
            default: logger.debug(this.info);
        }
    };

}


module.exports = Stack; 

// var stack = {


    
//     info: "This is stackTrace module",
//     echo: function(){
//         var args, file, frame, line, method;
//         //args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
//         args = 1 <= arguments.length ? Array.prototype.slice.call(arguments, 0) : [];


        
      
//         frame = stackTrace.get()[1];
//         file = path.basename(frame.getFileName());
//         line = frame.getLineNumber();
//         method = frame.getFunctionName();
      
//         args.unshift("" + file + ":" + line + " in " + method + "()");


//         var self = this;
//         //self.tableRows

//         self.logItFile();

//         return log.info.apply(log, args); // changed 'debug' to canonical npmlog 'info'
//     },
//     logItFile: function(){
//         log4js.configure({
//             appenders: { cheese: { type: 'file', filename: 'log4js.log' } },
//             categories: { default: { appenders: ['cheese'], level: 'error' } }
//         });
//         var logger = log4js.getLogger();
//         logger.category = "FILElogger";
//         logger.level = 'debug';
//         logger.debug("Some debug messages");
//     }
// };







