plugins {
    `kotlin-dsl`
}

dependencies {
    implementation(libs.plugins.kotlin.js.toDep())
    implementation(libs.plugins.kotlin.plugin.serialization.toDep())
    implementation(libs.plugins.kotlin.actions.toDep())
}

fun Provider<PluginDependency>.toDep() = map {
    "${it.pluginId}:${it.pluginId}.gradle.plugin:${it.version}"
}
