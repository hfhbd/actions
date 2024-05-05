import com.github.actions.*
import io.ktor.client.*
import io.ktor.client.call.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.request.*
import io.ktor.serialization.kotlinx.json.*
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json

suspend fun action(token: String?): Outputs = when (val event = github.context.eventName) {
    "release" -> {
        val ref = github.context.ref
        Outputs(ref = ref, version = ref.removePrefix("refs/tags/v"))
    }

    "workflow_dispatch" -> {
        val ref = github.context.ref
        val version = if (ref.startsWith("refs/heads/main")) {
            getLatestVersion(
                owner = github.context.repo.owner,
                repo = github.context.repo.repo,
                token = token ?: github.context.token,
            )
        } else if (ref.startsWith("refs/tags/v")) {
            ref.removePrefix("refs/tags/v")
        } else error("Not supported ref: $ref")
        Outputs(
            ref = ref,
            version = "$version.${github.context.runNumber}",
        )
    }

    "schedule" -> {
        val latestVersion = getLatestVersion(
            owner = github.context.repo.owner,
            repo = github.context.repo.repo,
            token = token ?: github.context.token,
        )
        Outputs(
            ref = "refs/tags/v$latestVersion",
            version = "$latestVersion.${github.context.runNumber}"
        )
    }

    else -> error("Not supported event: $event")
}

suspend fun getLatestVersion(
    owner: String,
    repo: String,
    token: String,
): String {
    val client = HttpClient(NodeJsEsModule) {
        install(ContentNegotiation) {
            json(
                json = Json {
                    ignoreUnknownKeys = true
                    useAlternativeNames = false
                }
            )
        }
        expectSuccess = true
    }
    val latestRelease = client.get("https://api.github.com/repos/${owner}/${repo}/releases/latest") {
        bearerAuth(token)
    }.body<Release>()

    val tagName = latestRelease.tagName
    return tagName.removePrefix("v")
}

@Serializable
data class Release(
    @SerialName("tag_name")
    val tagName: String
)
