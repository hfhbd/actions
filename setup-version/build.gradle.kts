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
