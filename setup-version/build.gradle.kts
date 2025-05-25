import org.jetbrains.kotlin.gradle.targets.js.nodejs.NodeJsEnvSpec
import org.jetbrains.kotlin.gradle.targets.js.nodejs.NodeJsPlugin

plugins {
    id("app.softwork.kotlin.actions")
    kotlin("plugin.serialization")
}

kotlin {
    sourceSets {
        jsMain {
            dependencies {
                implementation(libs.kotlin.actions.ktor.engine)
                implementation(libs.ktor.client.js)
                implementation(libs.ktor.client.content.negotiation)
                implementation(libs.ktor.serialization.kotlinx.json)
            }
        }

        jsTest {
            dependencies {
                implementation(kotlin("test"))
            }
        }
    }
}

plugins.withType<NodeJsPlugin> {
    the<NodeJsEnvSpec>().downloadBaseUrl = null
}
