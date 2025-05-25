import kotlin.test.Test
import kotlin.test.assertEquals

class TestNextSnapshot {
    @Test
    fun next() {
        assertEquals("0.1.0-SNAPSHOT", nextSnapshotVersion("0.0.1"))
        assertEquals("0.2.0-SNAPSHOT", nextSnapshotVersion("0.1.1"))
        assertEquals("1.2.0-SNAPSHOT", nextSnapshotVersion("1.1.1"))
        assertEquals("1.1.0-SNAPSHOT", nextSnapshotVersion("1.0.1"))
    }
}
