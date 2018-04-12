<template>
  <div>
    <!-- Page Content -->
    <div class="container">

      <div class="row">

        <!-- Blog Entries Column -->
        <div class="col-lg-8">
          <div v-if="!!collection">
            <h1 class="mt-4">{{collection.name}}</h1>

            <hr>

            <div v-if="!start">
              <!-- Date/Time -->
              <p>Ngày đăng: {{moment.unix(collection.created_at).format('DD-MM-YYYY')}} &middot; Thời gian làm bài: {{moment.utc(collection.time*1000).format('HH:mm:ss')}} &middot; Số câu hỏi: {{collection.questions && collection.questions.length}}</p>

              <hr v-if="!!collection.image">

              <!-- Preview Image -->
              <img class="img img-responsive" style="width: 100%;" :src="collection.image" alt="">

              <hr v-if="!!collection.description">

              <!-- Post Content -->

              <p>{{collection.description}}</p>

              <hr>

              <button v-if="collection.questions.length > 0 && collection.isPublish" type="button" class="btn btn-primary btn-lg" @click="generateAnswerSheet">Bắt đầu làm bài</button>
            </div>

            <div v-if="start && questions.length > 0">
              <div class="card">
                <h5 class="card-header">Câu {{selectedQuestion+1}}: {{questions[selectedQuestion].question.content}}</h5>
                <div class="card-body">
                  <img v-if="questions[selectedQuestion].question.extraContent" class="img img-responsive" style="max-height: 200px" :src="questions[selectedQuestion].question.extraContent" alt="">

                  <div class="list-group">
                    <button v-for="(answer, index) in questions[selectedQuestion].question.answers_without_correct" type="button"
                            :class="['list-group-item list-group-item-action', {}]"
                      @click="() => onSelectAnswer(index)"
                    >
                      {{answer.content}}
                    </button>
                  </div>
                </div>

                <div class="card-footer text-success">
                  {{questions[selectedQuestion].question.multiChoice ? '* Có thể chọn nhiều đáp án' : '* Chọn 1 đáp án đúng'}}
                </div>

              </div>

              <div style="margin-top: 8px;">
                <button type="button" class="btn btn-primary" @click="onAnswerQuestion">Trả lời</button>
                <button type="button" class="btn btn-warning" style="color: white" @click="bookmarkQuestion">Đánh dấu</button>
              </div>
            </div>
            <div v-if="false">{{questions[selectedQuestion]}}</div>
          </div>
        </div>

        <!-- Sidebar Widgets Column -->
        <div class="col-md-4">

          <!-- Search Widget -->
         <SearchWidget v-show="!start"/>

          <!-- Categories Widget -->
          <TagWidget v-show="!start"/>

          <!-- Side Widget -->
          <div v-if="!start"  class="card my-4">
            <h5 class="card-header">Thông báo!</h5>
            <div class="card-body">
              Chào mừng bạn abcxyz!!!
            </div>
          </div>

          <div v-if="start"  class="card my-4">
            <h5 class="card-header"> Câu hỏi</h5>
            <div class="card-body">
              <button
                  v-for="n in questions.length" type="button"
                  :class="['btn', generateBtnColorByType(questions[n-1].status)]"
                  :style="{margin: '8px', 'border-bottom-width': selectedQuestion === (n-1) ? '2px' : '0', 'border-bottom-color': 'red'}"
                  @click="selectedQuestion=(n-1)">{{n}}</button>
            </div>
          </div>

          <div v-if="start"  class="card my-4">
            <h5 class="card-header"> Chú thích</h5>
            <div class="card-body">
              <ul class="list-group">
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  Đã trả lời
                  <button type="button" class="btn btn-primary"></button>
                </li>

                <li class="list-group-item d-flex justify-content-between align-items-center">
                Chưa xem
                <button type="button" class="btn btn-secondary"></button>
              </li>

                <li class="list-group-item d-flex justify-content-between align-items-center">
                  Xem lại sau
                  <button type="button" class="btn btn-warning"></button>
                </li>
              </ul>
            </div>
          </div>

          <div v-if="start"  class="card my-4">
            <div class="card-body">
              <button type="button" class="btn btn-success btn-lg" @click="onFinish">Nộp Bài</button>
              <button type="button" class="btn btn-danger btn-lg" @click="() => onCancel(false)">Huỷ Bài</button>
            </div>
          </div>

        </div>


      </div>
      <!-- /.row -->

      <div class="modal fade" id="modalConfirmFinish" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Xác nhận</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              Bạn có chắc muốn kết thúc bài thi
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
              <button type="button" class="btn btn-primary">Đồng ý</button>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade" id="modalConfirmCancel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Xác nhận</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              Bạn có chắc muốn huỷ bài thi
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
              <button type="button" class="btn btn-primary" @click="() => onCancel(true)">Đồng ý</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import { detailCollection, createAnswerSheet, updateAnswerSheetStatus } from '@/api'
import {mapActions} from 'vuex'

const ANSWER_STATUS = {
  NOT_SEEN: 0,
  BOOKMARK: 1,
  ANSWERED: 2
}
export default {
  data: () => {
    return {
      collection: null,
      answerSheetId: null,
      loading: false,
      start: false,
      questions: [],
      answerSheet: [],
      selectedQuestion: -1,
      selectedAnswer: []
    }
  },
  watch: {
    selectedQuestion: function () {
      this.selectedAnswer = new Array(this.questions[this.selectedQuestion].question.answers_without_correct.length)
      this.selectedAnswer.fill(false)
    }
  },
  created: function () {
    this.fetchData()
  },
  methods: {
    ...mapActions([
      'publishCollection'
    ]),
    fetchData () {
      this.loading = true
      detailCollection(this.$route.params.id).then(result => {
        this.collection = result.data
        this.loading = false
      })
    },
    generateAnswerSheet: function () {
      createAnswerSheet(this.collection.id).then(data => {
        this.answerSheetId = data.data.id
        this.questions = data.data.answer_sheet_detail.map(item => ({...item, status: ANSWER_STATUS.NOT_SEEN}))
        this.start = true
        this.selectedQuestion = 0
      })
    },
    generateBtnColorByType: function (type) {
      switch (type) {
        case ANSWER_STATUS.NOT_SEEN: return 'btn-secondary'
        case ANSWER_STATUS.BOOKMARK: return 'btn-warning'
        case ANSWER_STATUS.ANSWERED: return 'btn-primary'
      }
    },
    bookmarkQuestion: function () {
      this.questions[this.selectedQuestion].status = ANSWER_STATUS.BOOKMARK
    },
    onSelectAnswer: function (index) {
      this.selectedAnswer[index] = true
    },
    onAnswerQuestion: function () {
      console.log(this.selectedAnswer)
    },
    onFinish: function (type) {
      $('#modalConfirmFinish').modal('toggle')
    },
    onCancel: function (confirmed) {
      if (!confirmed) {
        $('#modalConfirmCancel').modal('toggle')
      } else {
        updateAnswerSheetStatus(this.answerSheetId, 2).then(data => {
          if (data.data) {
            $('#modalConfirmCancel').modal('toggle')
            this.$router.back()
          }
        })
      }
    }
  }
}
</script>
