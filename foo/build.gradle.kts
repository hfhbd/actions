plugins {
    id("app.softwork.kotlin.actions")
}

kotlin {
    sourceSets {
        commonTest {
            dependencies {
                implementation(kotlin("test"))
            }
        }
    }
}
