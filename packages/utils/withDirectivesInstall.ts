import type { App, Directive, Plugin } from 'vue'

function withDirectivesInstall(name: string, directive: Directive):Directive & Plugin {
  const directivePlugins = directive as Directive & Plugin
  directivePlugins.install = (app: App) => {
    app.directive(name, directive)
  }
  return directivePlugins
}

export default withDirectivesInstall