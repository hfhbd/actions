plugins {
    id("app.softwork.kotlin.actions")
}

kotlin {
    sourceSets {
        mainTest {
            dependencies {
                implementation(kotlin("test"))
            }
        }
    }
}
