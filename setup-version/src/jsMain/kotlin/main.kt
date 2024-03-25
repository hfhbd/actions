import com.github.actions.*

suspend fun action() {
    val (ref, version) = when (github.context.eventName) {
        "release", "workflow_dispatch" -> {
            val ref = github.context.ref
            val version = ref.removePrefix("refs/tags/v")
            ref to version
        }

        "schedule" -> getLatestVersionAndRef(github.getOctokit(core.getInput("GH_TOKEN") {
            required = true
        }))

        else -> error("Not supported")
    }
    core.exportVariable("ref", ref)
    core.exportVariable("version", version)
}

suspend fun getLatestVersionAndRef(octokit: Octokit): Pair<String, String> {
    val tagName = octokit.rest.repos.getLatestRelease(
        owner = github.context.repo.owner,
        repo = github.context.repo.repo
    )!!.tag_name
    val version = tagName.removePrefix("v")
    val ref = "refs/tags/v$tagName"
    return version to ref
}
