import actions.core.exportVariable
import com.github.actions.*
import io.ktor.client.*
import io.ktor.client.call.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.request.*
import io.ktor.serialization.kotlinx.json.*
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json

suspend fun action(token: String?): Outputs {
    val (ref, version) = when (val event = github.context.eventName) {
        "release" -> {
            val ref = github.context.ref
            val version = ref.removePrefix("refs/tags/v")
            ref to version
        }

        "workflow_dispatch" -> {
            val ref = github.context.ref
            val version = if (ref.startsWith("refs/heads/main")) {
                getLatestVersion(github.context.repo.owner, github.context.repo.repo, token ?: github.context.token)
            } else if (ref.startsWith("refs/tags/v")){
                ref.removePrefix("refs/tags/v")
            } else error("Not supported ref: $ref")
            ref to "$version.${github.context.runNumber}"
        }

        "schedule" -> {
            val latestVersion = getLatestVersion(github.context.repo.owner, github.context.repo.repo, token ?: github.context.token)
            "refs/tags/v$latestVersion" to "$latestVersion.${github.context.runNumber}"
        }

        else -> error("Not supported event: $event")
    }
    exportVariable("version", version)
    return Outputs(
        ref = ref,
    )
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
