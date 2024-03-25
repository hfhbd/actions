plugins {
    `kotlin-dsl`
}

dependencies {
    implementation(libs.plugins.kotlin.js.toDep())
    implementation("app.softwork.kotlin.actions:gradle-plugin:0.0.1")
    // implementation(libs.plugins.kotlin.actions.toDep())
}

fun Provider<PluginDependency>.toDep() = map {
    "${it.pluginId}:${it.pluginId}.gradle.plugin:${it.version}"
}
