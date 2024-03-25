import com.github.actions.*

suspend fun action(): Outputs {
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

        "schedule" -> getLatestVersionAndRef(github.getOctokit(github.context.token))

        else -> error("Not supported")
    }
    core.exportVariable("ref", ref)
    core.exportVariable("version", version)

    return Outputs(
        "v$version"
    )
}

suspend fun getLatestVersionAndRef(octokit: Octokit): Pair<String, String> {
    val tagName = octokit.rest.repos.getLatestRelease(
        owner = github.context.repo.owner,
        repo = github.context.repo.repo
    )!!.tag_name
    val version = tagName.removePrefix("v")
    val ref = "refs/tags/v$tagName"
    return ref to "$version.${github.context.runNumber}"
}
