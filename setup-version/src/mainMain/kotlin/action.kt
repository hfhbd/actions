import com.github.actions.*
import io.ktor.client.*
import io.ktor.client.call.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.request.*
import io.ktor.serialization.kotlinx.json.*
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json

suspend fun action(token: String): Outputs {
    val (ref, version) = when (github.context.eventName) {
        "release" -> {
            val ref = github.context.ref
            val version = ref.removePrefix("refs/tags/v")
            ref to version
        }

        "workflow_dispatch" -> {
            val ref = github.context.ref
            val version = ref.removePrefix("refs/tags/v")
            ref to "$version.${github.context.runNumber}"
        }

        "schedule" -> getLatestVersionAndRef(github.context.repo.owner, github.context.repo.repo, token)

        else -> error("Not supported")
    }
    core.exportVariable("ref", ref)
    core.exportVariable("version", version)

    return Outputs(
        fullTag = "v$version"
    )
}

suspend fun getLatestVersionAndRef(
    owner: String,
    repo: String,
    token: String,
): Pair<String, String> {
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
    }
    val latestRelease = client.get(" https://api.github.com/repos/${owner}/${repo}/releases/latest") {
        bearerAuth(token)
    }.body<Release>()

    val tagName = latestRelease.tag_name
    val version = tagName.removePrefix("v")
    val ref = "refs/tags/v$tagName"
    return ref to "$version.${github.context.runNumber}"
}

@Serializable
data class Release(
    val tag_name: String
)
