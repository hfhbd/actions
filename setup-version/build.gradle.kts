plugins {
    id("app.softwork.kotlin.actions")
}

kotlin {
    sourceSets {
        jsTest {
            dependencies {
                implementation(kotlin("test"))
            }
        }
    }
}
