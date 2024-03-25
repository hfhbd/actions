import {
  Unit_instance104q5opgivhr8 as Unit_instance,
  protoOf180f3jzyo7rfj as protoOf,
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl,
  get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED,
  initMetadataForCoroutine1i7lbatuf5bnt as initMetadataForCoroutine,
  get_EmptyContinuationn1rwa6yr6j5w as get_EmptyContinuation,
  toString1pkumu07cwy4m as toString,
  IllegalStateException_init_$Create$7dcay63pdh1l as IllegalStateException_init_$Create$,
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
initMetadataForClass(Outputs, 'Outputs');
initMetadataForCoroutine($mainCOROUTINE$0, CoroutineImpl);
initMetadataForCoroutine($actionCOROUTINE$1, CoroutineImpl);
initMetadataForCoroutine($getLatestVersionAndRefCOROUTINE$2, CoroutineImpl);
//endregion
function main($completion) {
  var tmp = new $mainCOROUTINE$0($completion);
  tmp.u_1 = Unit_instance;
  tmp.v_1 = null;
  return tmp.p2();
}
function Outputs(fullTag) {
  this.y2_1 = fullTag;
}
protoOf(Outputs).toString = function () {
  return 'Outputs(fullTag=' + this.y2_1 + ')';
};
protoOf(Outputs).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof Outputs))
    return false;
  var tmp0_other_with_cast = other instanceof Outputs ? other : THROW_CCE();
  if (!(this.y2_1 === tmp0_other_with_cast.y2_1))
    return false;
  return true;
};
function $mainCOROUTINE$0(resultContinuation) {
  CoroutineImpl.call(this, resultContinuation);
}
protoOf($mainCOROUTINE$0).p2 = function () {
  var suspendResult = this.u_1;
  $sm: do
    try {
      var tmp = this.s_1;
      switch (tmp) {
        case 0:
          this.t_1 = 2;
          this.s_1 = 1;
          suspendResult = action(this);
          if (suspendResult === get_COROUTINE_SUSPENDED()) {
            return suspendResult;
          }

          continue $sm;
        case 1:
          var outputs = suspendResult;
          com_github_actions_core_z59iaa.setOutput('full-tag', outputs.y2_1);
          return Unit_instance;
        case 2:
          throw this.v_1;
      }
    } catch ($p) {
      var e = $p;
      if (this.t_1 === 2) {
        throw e;
      } else {
        this.s_1 = this.t_1;
        this.v_1 = e;
      }
    }
   while (true);
};
function mainWrapper() {
  main(get_EmptyContinuation());
}
function action($completion) {
  var tmp = new $actionCOROUTINE$1($completion);
  tmp.u_1 = Unit_instance;
  tmp.v_1 = null;
  return tmp.p2();
}
function getLatestVersionAndRef(octokit, $completion) {
  var tmp = new $getLatestVersionAndRefCOROUTINE$2(octokit, $completion);
  tmp.u_1 = Unit_instance;
  tmp.v_1 = null;
  return tmp.p2();
}
function $actionCOROUTINE$1(resultContinuation) {
  CoroutineImpl.call(this, resultContinuation);
}
protoOf($actionCOROUTINE$1).p2 = function () {
  var suspendResult = this.u_1;
  $sm: do
    try {
      var tmp = this.s_1;
      switch (tmp) {
        case 0:
          this.t_1 = 3;
          this.h3_1 = com_github_actions_github_y1dwzy.context.eventName;
          if (this.h3_1 === 'release') {
            var tmp_0 = this;
            var ref = com_github_actions_github_y1dwzy.context.ref;
            var version = removePrefix(ref, 'refs/tags/v');
            tmp_0.i3_1 = to(ref, version);
            this.s_1 = 2;
            continue $sm;
          } else {
            if (this.h3_1 === 'workflow_dispatch') {
              var tmp_1 = this;
              var ref_0 = com_github_actions_github_y1dwzy.context.ref;
              var version_0 = removePrefix(ref_0, 'refs/tags/v');
              tmp_1.i3_1 = to(ref_0, version_0 + '.' + com_github_actions_github_y1dwzy.context.runNumber.toString());
              this.s_1 = 2;
              continue $sm;
            } else {
              if (this.h3_1 === 'schedule') {
                this.s_1 = 1;
                suspendResult = getLatestVersionAndRef(com_github_actions_github_y1dwzy.getOctokit(get_token(com_github_actions_github_y1dwzy.context)), this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }
                continue $sm;
              } else {
                var tmp_2 = this;
                var message = 'Not supported';
                throw IllegalStateException_init_$Create$(toString(message));
              }
            }
          }

        case 1:
          this.i3_1 = suspendResult;
          this.s_1 = 2;
          continue $sm;
        case 2:
          var _destruct__k2r9zo = this.i3_1;
          var ref_1 = _destruct__k2r9zo.w1();
          var version_1 = _destruct__k2r9zo.x1();
          com_github_actions_core_z59iaa.exportVariable('ref', ref_1);
          com_github_actions_core_z59iaa.exportVariable('version', version_1);
          return new Outputs('v' + version_1);
        case 3:
          throw this.v_1;
      }
    } catch ($p) {
      var e = $p;
      if (this.t_1 === 3) {
        throw e;
      } else {
        this.s_1 = this.t_1;
        this.v_1 = e;
      }
    }
   while (true);
};
function $getLatestVersionAndRefCOROUTINE$2(octokit, resultContinuation) {
  CoroutineImpl.call(this, resultContinuation);
  this.r3_1 = octokit;
}
protoOf($getLatestVersionAndRefCOROUTINE$2).p2 = function () {
  var suspendResult = this.u_1;
  $sm: do
    try {
      var tmp = this.s_1;
      switch (tmp) {
        case 0:
          this.t_1 = 2;
          this.s_1 = 1;
          suspendResult = this.r3_1.rest.repos.getLatestRelease(com_github_actions_github_y1dwzy.context.repo.owner, com_github_actions_github_y1dwzy.context.repo.repo, this);
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
          throw this.v_1;
      }
    } catch ($p) {
      var e = $p;
      if (this.t_1 === 2) {
        throw e;
      } else {
        this.s_1 = this.t_1;
        this.v_1 = e;
      }
    }
   while (true);
};
mainWrapper();
