import org.jetbrains.kotlin.gradle.targets.js.nodejs.NodeJsEnvSpec
import org.jetbrains.kotlin.gradle.targets.js.nodejs.NodeJsRootPlugin

plugins.withType<NodeJsRootPlugin> {
    the<NodeJsEnvSpec>().downloadBaseUrl = null
}
