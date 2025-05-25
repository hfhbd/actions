import actions.github.context
import app.softwork.kotlin.actions.JsEsModule
import io.ktor.client.*
import io.ktor.client.call.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.plugins.defaultRequest
import io.ktor.client.request.*
import io.ktor.serialization.kotlinx.json.*
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json

suspend fun action(token: String): Outputs = when (val event = context.eventName) {
    "release" -> {
        val ref = context.ref
        Outputs(ref = ref, version = ref.removePrefix("refs/tags/v"))
    }

    "workflow_dispatch" -> {
        val ref = context.ref
        val version = if (ref.startsWith("refs/heads/main")) {
            getLatestVersion(
                owner = context.repo.owner,
                repo = context.repo.repo,
                token = token,
            )
        } else if (ref.startsWith("refs/tags/v")) {
            ref.removePrefix("refs/tags/v")
        } else error("Not supported ref: $ref")
        Outputs(
            ref = ref,
            version = "$version.${context.runNumber}",
        )
    }

    "schedule" -> {
        val latestVersion = getLatestVersion(
            owner = context.repo.owner,
            repo = context.repo.repo,
            token = token,
        )
        Outputs(
            ref = "refs/tags/v$latestVersion",
            version = "$latestVersion.${context.runNumber}"
        )
    }

    "push" -> {
        val latestReleased = getLatestVersion(
            owner = context.repo.owner,
            repo = context.repo.repo,
            token = token,
        )

        Outputs(
            ref = context.ref,
            version = nextSnapshotVersion(latestReleased)
        )
    }

    else -> error("Not supported event: $event")
}

internal fun nextSnapshotVersion(latestReleased: String): String {
    val (major, minor) = latestReleased.split(".").map { it.toInt() }
    return "$major.${minor + 1}.0-SNAPSHOT"
}

suspend fun getLatestVersion(
    owner: String,
    repo: String,
    token: String,
): String {
    val client = HttpClient(JsEsModule) {
        install(ContentNegotiation) {
            json(
                json = Json {
                    ignoreUnknownKeys = true
                    useAlternativeNames = false
                }
            )
        }
        expectSuccess = true
        defaultRequest {
            url(context.apiUrl)
            bearerAuth(token)
        }
    }
    val latestRelease = client.get("/repos/${owner}/${repo}/releases/latest").body<Release>()

    val tagName = latestRelease.tagName
    return tagName.removePrefix("v")
}

@Serializable
data class Release(
    @SerialName("tag_name")
    val tagName: String
)
