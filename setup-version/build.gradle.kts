plugins {
    id("app.softwork.kotlin.actions")
    kotlin("plugin.serialization")
}

kotlin {
    sourceSets {
        mainMain {
            dependencies {
                implementation(libs.ktor.client.js)
                implementation(libs.ktor.client.content.negotiation)
                implementation(libs.ktor.serialization.kotlinx.json)
            }
        }
        mainTest {
            dependencies {
                implementation(kotlin("test"))
            }
        }
    }
}
