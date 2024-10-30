let buildId = (process.env.buildId != null) ? process.env.buildId : 'local';
module.exports = {
    default: {
            parallel: 1,
            requireModule: ['ts-node/register'],
            require: ['tests/steps_def/*.js','tests/setup/*.js'],
            paths: ['tests/features/**/*.feature'],
            format: [`json:reports/multi-json-html/${buildId}/cucumber_report.json`],
          //  retry: 1
           
        }
        
}
