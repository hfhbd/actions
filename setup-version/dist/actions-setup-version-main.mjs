import {
  Unit_instance104q5opgivhr8 as Unit_instance,
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl,
  get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED,
  initMetadataForCoroutine1i7lbatuf5bnt as initMetadataForCoroutine,
  get_EmptyContinuationn1rwa6yr6j5w as get_EmptyContinuation,
  IllegalStateExceptionkoljg5n0nrlr as IllegalStateException,
  toString1pkumu07cwy4m as toString,
  removePrefix279df90bhrqqg as removePrefix,
  to2cs3ny02qtbcb as to,
  ensureNotNull1e947j3ixpazm as ensureNotNull,
} from './kotlin-kotlin-stdlib.mjs';
import { get_token5mn2ctm2tja1 as get_token } from './kotlin-actions-runtime.mjs';
import com_github_actions_core_z59iaa from '@actions/core';
import com_github_actions_github_y1dwzy from '@actions/github';
//region block: imports
//endregion
//region block: pre-declaration
class Outputs {
  constructor(fullTag) {
    this.x3_1 = fullTag;
  }
  toString() {
    return 'Outputs(fullTag=' + this.x3_1 + ')';
  }
  equals(other) {
    if (this === other)
      return true;
    if (!(other instanceof Outputs))
      return false;
    var tmp0_other_with_cast = other instanceof Outputs ? other : THROW_CCE();
    if (!(this.x3_1 === tmp0_other_with_cast.x3_1))
      return false;
    return true;
  }
}
class $mainCOROUTINE$0 extends CoroutineImpl {
  o3() {
    var suspendResult = this.i1_1;
    $sm: do
      try {
        var tmp = this.g1_1;
        switch (tmp) {
          case 0:
            this.h1_1 = 2;
            this.g1_1 = 1;
            suspendResult = action(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var outputs = suspendResult;
            com_github_actions_core_z59iaa.setOutput('full-tag', outputs.x3_1);
            return Unit_instance;
          case 2:
            throw this.j1_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.h1_1 === 2) {
          throw e;
        } else {
          this.g1_1 = this.h1_1;
          this.j1_1 = e;
        }
      }
     while (true);
  }
}
class $actionCOROUTINE$1 extends CoroutineImpl {
  o3() {
    var suspendResult = this.i1_1;
    $sm: do
      try {
        var tmp = this.g1_1;
        switch (tmp) {
          case 0:
            this.h1_1 = 3;
            this.g4_1 = com_github_actions_github_y1dwzy.context.eventName;
            if (this.g4_1 === 'release') {
              var tmp_0 = this;
              var ref = com_github_actions_github_y1dwzy.context.ref;
              var version = removePrefix(ref, 'refs/tags/v');
              tmp_0.h4_1 = to(ref, version);
              this.g1_1 = 2;
              continue $sm;
            } else {
              if (this.g4_1 === 'workflow_dispatch') {
                var tmp_1 = this;
                var ref_0 = com_github_actions_github_y1dwzy.context.ref;
                var version_0 = removePrefix(ref_0, 'refs/tags/v');
                tmp_1.h4_1 = to(ref_0, version_0 + '.' + com_github_actions_github_y1dwzy.context.runNumber.toString());
                this.g1_1 = 2;
                continue $sm;
              } else {
                if (this.g4_1 === 'schedule') {
                  this.g1_1 = 1;
                  suspendResult = getLatestVersionAndRef(com_github_actions_github_y1dwzy.getOctokit(get_token(com_github_actions_github_y1dwzy.context)), this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  var tmp_2 = this;
                  var message = 'Not supported';
                  throw IllegalStateException.m2(toString(message));
                }
              }
            }

          case 1:
            this.h4_1 = suspendResult;
            this.g1_1 = 2;
            continue $sm;
          case 2:
            var _destruct__k2r9zo = this.h4_1;
            var ref_1 = _destruct__k2r9zo.v2();
            var version_1 = _destruct__k2r9zo.w2();
            com_github_actions_core_z59iaa.exportVariable('ref', ref_1);
            com_github_actions_core_z59iaa.exportVariable('version', version_1);
            return new Outputs('v' + version_1);
          case 3:
            throw this.j1_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.h1_1 === 3) {
          throw e;
        } else {
          this.g1_1 = this.h1_1;
          this.j1_1 = e;
        }
      }
     while (true);
  }
}
class $getLatestVersionAndRefCOROUTINE$2 extends CoroutineImpl {
  constructor(octokit, resultContinuation) {
    super(resultContinuation);
    this.q4_1 = octokit;
  }
  o3() {
    var suspendResult = this.i1_1;
    $sm: do
      try {
        var tmp = this.g1_1;
        switch (tmp) {
          case 0:
            this.h1_1 = 2;
            this.g1_1 = 1;
            suspendResult = this.q4_1.rest.repos.getLatestRelease(com_github_actions_github_y1dwzy.context.repo.owner, com_github_actions_github_y1dwzy.context.repo.repo, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var ARGUMENT = suspendResult;
            var ARGUMENT_0 = ensureNotNull(ARGUMENT);
            var tagName = ARGUMENT_0.tag_name;
            var version = removePrefix(tagName, 'v');
            var ref = 'refs/tags/v' + tagName;
            return to(ref, version + '.' + com_github_actions_github_y1dwzy.context.runNumber.toString());
          case 2:
            throw this.j1_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.h1_1 === 2) {
          throw e;
        } else {
          this.g1_1 = this.h1_1;
          this.j1_1 = e;
        }
      }
     while (true);
  }
}
//endregion
function main($completion) {
  var tmp = new $mainCOROUTINE$0($completion);
  tmp.i1_1 = Unit_instance;
  tmp.j1_1 = null;
  return tmp.o3();
}
function mainWrapper() {
  main(get_EmptyContinuation());
}
function action($completion) {
  var tmp = new $actionCOROUTINE$1($completion);
  tmp.i1_1 = Unit_instance;
  tmp.j1_1 = null;
  return tmp.o3();
}
function getLatestVersionAndRef(octokit, $completion) {
  var tmp = new $getLatestVersionAndRefCOROUTINE$2(octokit, $completion);
  tmp.i1_1 = Unit_instance;
  tmp.j1_1 = null;
  return tmp.o3();
}
//region block: post-declaration
initMetadataForClass(Outputs, 'Outputs');
initMetadataForCoroutine($mainCOROUTINE$0);
initMetadataForCoroutine($actionCOROUTINE$1);
initMetadataForCoroutine($getLatestVersionAndRefCOROUTINE$2);
//endregion
mainWrapper();

//# sourceMappingURL=actions-setup-version-main.mjs.map
