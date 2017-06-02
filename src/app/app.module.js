import { module } from 'angular';
import modules from './modules/modules.module';
import core from './core/core.module';

module('app', [
    core,
    modules
])
