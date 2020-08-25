<template>
  <v-app id="inspire">
    <v-form v-model="valid" ref="form">
      <v-container>
        <v-subheader>Fields marked with * are required.</v-subheader>
        <fieldset class="pa-5 mb-10">
          <legend>Required Confirmations</legend>
          <div>Before starting your application, please confirm that:</div>
          <v-row>
            <v-col cols="12">
              <v-checkbox
                :rules="[rules.required()]"
              >
                <template v-slot:label>
                  <div>I have read the Information Sheet on the <a target="_blank" @click.stop href="/help/nominations-faq">FAQ page</a> explaining the nominating procedure and am familiar with the requirements.*</div>
                </template>
              </v-checkbox>
              <v-checkbox
                :rules="[rules.required()]"
                label='I certify that I am a legal resident of the fifth congressional district of Maryland.*'
              ></v-checkbox>
              <v-checkbox
                :rules="[rules.required()]"
              >
                <template v-slot:label>
                  <div>I understand that, if my application packet is not postmarked by the deadline posted above, I will not be scheduled for an interview and given final consideration for a nomination.*</div>
                </template>
              </v-checkbox>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="1">
              <v-radio-group :mandatory="true" v-model="form.permission.media">
                <v-radio label="Yes" :value="true"></v-radio>
                <v-radio label="No" :value="false"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col>
              <p class="mt-5" style="color:rgba(0, 0, 0, 0.6)">I hereby give permission to Congressman Hoyer's office to provide my name to any local media who may be interested in contacting me upon the publication of my name in local newspapers if I receive a nomination and/or appointment to a U.S. Service Academy</p>
              </v-col>
          </v-row>
        </fieldset>
        <fieldset class="pa-5 mb-10">
        <legend>Personal Information</legend>
        <v-row>
          <v-col cols="12" md="8">
            <v-text-field
              v-model="form.personal.name"
              :rules="[rules.required()]"
              label="Full Name*"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="form.personal.ssn"
              :counter="9"
              :rules="[rules.required(), rules.exactLength('Social Security Number', 9)]"
              validate-on-blur
              label="Social Security Number*"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="form.personal.email"
              label="Email*"
              :rules="[rules.required(), rules.email()]"
              validate-on-blur
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-menu
              ref="dobMenu"
              v-model="dobMenu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="form.personal.birth.date"
                  label="Birthday date*"
                  readonly
                  v-bind="attrs"
                  :rules="[rules.required()]"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                ref="picker"
                v-model="form.personal.birth.date"
                :max="new Date().toISOString().substr(0, 10)"
                min="1950-01-01"
                @change="save"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" md="8">
            <v-text-field
              v-model="form.personal.birth.place"
              label="Place of Birth*"
              :rules="[rules.required('Place of Birth')]"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.personal.parents.father.name"
              label="Father's Name"
              ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.personal.parents.father.occupation"
              label="Father's Occupation"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.personal.parents.mother.name"
              label="Mother's Name"
              ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.personal.parents.mother.occupation"
              label="Mother's Occupation"
            ></v-text-field>
          </v-col>
        </v-row>
      </fieldset>
        <fieldset class="pa-5 mb-10">
          <legend>Legal Address in Maryland</legend>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="form.legalAddress.street"
                :rules="[rules.required()]"
                label="Street*"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.legalAddress.city"
                :rules="[rules.required()]"
                validate-on-blur
                label="City*"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field
                v-model="form.legalAddress.state"
                :rules="[rules.required(), rules.exactLength('State', 2)]"
                validate-on-blur
                label="State*"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="form.legalAddress.zipcode"
                :counter="5"
                :rules="[rules.required(), rules.exactLength('Zipcode', 5)]"
                validate-on-blur
                label="Zipcode*"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="form.legalAddress.phone"
                :rules="[rules.required()]"
                validate-on-blur
                label="Phone*"
              ></v-text-field>
            </v-col>
          </v-row>
        </fieldset>
        <fieldset class="pa-5 mb-10">
          <legend>Temporary Address If Applicable (PREP SCHOOL, etc)</legend>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="form.temporaryAddress.street"
                label="Street"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.temporaryAddress.city"
                validate-on-blur
                label="City"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field
                v-model="form.temporaryAddress.state"
                :rules="[rules.exactLength('State', 2)]"
                validate-on-blur
                label="State"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="form.temporaryAddress.zipcode"
                :counter="5"
                validate-on-blur
                label="Zipcode"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="form.temporaryAddress.phone"
                validate-on-blur
                label="Phone"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="form.temporaryAddress.endDate"
                validate-on-blur
                label="Address Valid Until"
              ></v-text-field>
            </v-col>
          </v-row>
        </fieldset>
        <fieldset class="pa-5 mb-10">
          <legend>Education & Employment</legend>
          <v-row>
            <v-col cols="12" md="9">
              <v-text-field
                v-model="form.educationEmployment.highSchool.location"
                :rules="[rules.required()]"
                label="High School*"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="form.educationEmployment.highSchool.graduation"
                :rules="[rules.required(), rules.exactLength('High School Graduation Year', 4)]"
                label="Year of Graduation*"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="9">
              <v-text-field
                v-model="form.educationEmployment.college.location"
                label="College (if any)"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="form.educationEmployment.college.yearsAttended"
                label="Years Completed"
                type="number"
              ></v-text-field>
            </v-col>
            <v-col cols="12">Indicate any extra curricular activities you participated in.</v-col>
            <v-col cols="4">
              <v-checkbox
                v-model="form.educationEmployment.extraCurricularActivities.clubs"
                value="Boys' State/Boys' Nation"
                label="Boys' State/Boys' Nation"
              ></v-checkbox>
            </v-col>
            <v-col cols="4">
              <v-checkbox
                v-model="form.educationEmployment.extraCurricularActivities.clubs"
                value="Girls' State/Girls' Nation"
                label="Girls' State/Girls' Nation"
              ></v-checkbox>
            </v-col>
            <v-col cols="4">
              <v-checkbox
                v-model="form.educationEmployment.extraCurricularActivities.clubs"
                value="President of Student Gov't"
                label="President of Student Gov't"
              ></v-checkbox>
            </v-col>
            <v-col cols="4">
              <v-checkbox
                v-model="form.educationEmployment.extraCurricularActivities.clubs"
                value="Other student Gov't office"
                label="Other student Gov't office"
              ></v-checkbox>
            </v-col>
            <v-col cols="4">
              <v-checkbox
                v-model="form.educationEmployment.extraCurricularActivities.clubs"
                value="Key Club"
                label="Key Club"
              ></v-checkbox>
            </v-col>
            <v-col cols="4">
              <v-checkbox
                v-model="form.educationEmployment.extraCurricularActivities.clubs"
                value="Service Club"
                label="Service Club"
              ></v-checkbox>
            </v-col>
            <v-col cols="4">
              <v-checkbox
                v-model="form.educationEmployment.extraCurricularActivities.clubs"
                value="Eagle Scout"
                label="Eagle Scout"
              ></v-checkbox>
            </v-col>
            <v-col cols="4">
              <v-checkbox
                v-model="form.educationEmployment.extraCurricularActivities.clubs"
                value="Girl Scout"
                label="Girl Scout"
              ></v-checkbox>
            </v-col>
            <v-col cols="4">
              <v-checkbox
                v-model="form.educationEmployment.extraCurricularActivities.clubs"
                value="Boy Scout"
                label="Boy Scout"
              ></v-checkbox>
            </v-col>
            <v-col cols="4">
              <v-checkbox
                v-model="form.educationEmployment.extraCurricularActivities.clubs"
                value="President of Class"
                label="President of Class"
              ></v-checkbox>
            </v-col>
            <v-col cols="4">
              <v-checkbox
                v-model="form.educationEmployment.extraCurricularActivities.clubs"
                value="Science Club"
                label="Science Club"
              ></v-checkbox>
            </v-col>
            <v-col cols="4">
              <v-checkbox
                v-model="form.educationEmployment.extraCurricularActivities.clubs"
                value="Student Council Member"
                label="Student Council Member"
              ></v-checkbox>
            </v-col>
            <v-col cols="4">
              <v-checkbox
                v-model="form.educationEmployment.extraCurricularActivities.clubs"
                value="National Honor Society"
                label="National Honor Society"
              ></v-checkbox>
            </v-col>
            <v-col cols="4">
              <v-checkbox
                v-model="form.educationEmployment.extraCurricularActivities.clubs"
                value="School Band/Chorus"
                label="School Band/Chorus"
              ></v-checkbox>
            </v-col>
            <v-col cols="4">
              <v-checkbox
                v-model="form.educationEmployment.extraCurricularActivities.clubs"
                value="Yearbook/Newspaper Editor"
                label="Yearbook/Newspaper Editor"
              ></v-checkbox>
            </v-col>
            <v-col cols="4">
              <v-checkbox
                v-model="form.educationEmployment.extraCurricularActivities.clubs"
                value="Community Award"
                label="Community Award"
              ></v-checkbox>
            </v-col>
            <v-col cols="4">
              <v-checkbox
                v-model="form.educationEmployment.extraCurricularActivities.clubs"
                value="Club Officer"
                label="Club Officer"
              ></v-checkbox>
            </v-col>
            <v-col cols="4">
              <v-checkbox
                v-model="form.educationEmployment.extraCurricularActivities.clubs"
                value="Junior ROTC"
                label="Junior ROTC"
              ></v-checkbox>
            </v-col>
            <v-col cols="4">
              <v-checkbox
                v-model="form.educationEmployment.extraCurricularActivities.clubs"
                value="Other"
                label="Other"
              ></v-checkbox>
            </v-col>
            <v-col cols="12">
              <v-textarea
                filled
                label="Provide additional information for activities indicated above"
                v-model="form.educationEmployment.extraCurricularActivities.additionalInfo"
                placeholder="List the grade(s) for each activity you selected above. Please indicate if you hold a leadership role in any of the activities you list."
                hint="List the grade(s) for each activity you selected above. Please indicate if you hold a leadership role in any of the activities you list."
              ></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-textarea
                filled
                label="List any athletic participation"
                v-model="form.educationEmployment.extraCurricularActivities.athleticParticipation"
                placeholder="For each, include the sport, whether you were varsity/JV, position, awards, letters, and grades."
                hint="For each, include the sport, whether you were varsity/JV, position, awards, letters, and grades."
              ></v-textarea>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.educationEmployment.employment.where"
                label="If employed, where"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="form.educationEmployment.employment.hoursPerWeek.afterSchool"
                label="How many hours per week after school"
                type="number"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="form.educationEmployment.employment.hoursPerWeek.summer"
                label="How many hours per week during summer"
                type="number"
              ></v-text-field>
            </v-col>
          </v-row>
        </fieldset>
        <fieldset class="pa-5 mb-10">
          <legend>Academy Selection</legend>
          <p>Please number the Academies in order of preference. Remember that you must open a candidate file with each Academy that you select.<br />
            BY SELECTING A SECOND AND/OR THIRD CHOICE, YOU ARE INDICATING YOU WOULD ALSO ACCEPT A NOMINATION TO THAT ACADEMY.</p>
          <v-row>
            <v-col cols="12" md="3">
              <v-select
                label="First Choice*"
                :rules="[rules.required()]"
                v-model="form.academySelection.first"
                :items="['US Air Force Academy', 'US Military Academy', 'US Merchant Marine Academy', 'US Naval Academy']"
              ></v-select>
            </v-col>
            <v-col cols="12" md="3">
              <v-select
                label="Second Choice"
                v-model="form.academySelection.second"
                :items="['US Air Force Academy', 'US Military Academy', 'US Merchant Marine Academy', 'US Naval Academy']"
              ></v-select>
            </v-col>
            <v-col cols="12" md="3">
              <v-select
                label="Third Choice"
                v-model="form.academySelection.third"
                :items="['US Air Force Academy', 'US Military Academy', 'US Merchant Marine Academy', 'US Naval Academy']"
              ></v-select>
            </v-col>
            <v-col cols="12" md="3">
              <v-select
                label="Fourth Choice"
                v-model="form.academySelection.fourth"
                :items="['US Air Force Academy', 'US Military Academy', 'US Merchant Marine Academy', 'US Naval Academy']"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="I am also seeking a nomination through"
                v-model="form.academySelection.where"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="8">
              <v-text-field
                label="I have previously sought a nomination through"
                v-model="form.academySelection.previous.where"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                label="When"
                v-model="form.academySelection.previous.when"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </fieldset>
        <fieldset class="pa-5 mb-10">
          <legend>Document Uploads</legend>
          <v-row>
            <v-col cols="12">
              <v-file-input
                :rules="[rules.required()]"
                accept=".pdf"
                v-model="form.files.transcript"
                hint="File must be in PDF format."
                persistent-hint
                label="Transcript of high school record, which includes junior year and class rank*"></v-file-input>
            </v-col>
            <v-col cols="12">
              <v-file-input
                :rules="[rules.required()]"
                accept=".pdf"
                v-model="form.files.guidance"
                hint="File must be in PDF format."
                persistent-hint
                label="Guidance Counselor Form*"></v-file-input>
            </v-col>
            <v-col cols="12">
              <v-file-input
                :rules="[rules.required()]"
                accept=".pdf"
                v-model="form.files.recommendation"
                hint="File must be in PDF format. Combine multiple files into a single PDF."
                persistent-hint
                label="Three Letters of Recommendation*"></v-file-input>
            </v-col>
            <v-col cols="12">
              <v-file-input
                :rules="[rules.required()]"
                accept=".pdf"
                v-model="form.files.essay"
                hint="File must be in PDF format."
                persistent-hint
                label="Four Essays – Personal Testimonial*"></v-file-input>
            </v-col>
            <v-col cols="12">
              <v-file-input
                :rules="[rules.required()]"
                accept="image/*"
                v-model="form.files.photo"
                hint="File can be in any image format"
                persistent-hint
                label="Recent photograph of applicant*"></v-file-input>
            </v-col>
          </v-row>
        </fieldset>
      <v-btn
        type="submit"
        id="submitButton"
        :disabled="!valid"
        @click="formSubmit()"
        block large
        class="primary">Send Nomination Request</v-btn>
    </v-container>
    </v-form>
  </v-app>
</template>

<script>
  export default{
    name: "nominations",
    head() {
      return {
        base: {
          target: '_parent'
        }
      }
    },
    data: () => ({
      valid: true,
      dobMenu: false,
      form: {
        permission: {
          media: true
        },
        personal: {
          name: null,
          ssn: null,
          email: null,
          birth: {
            date: null,
            place: null
          },
          parents: {
            father: {
              name: null,
              occupation: null,
            },
            mother: {
              name: null,
              occupation: null
            }
          },
        },
        legalAddress: {
          street: null,
          city: null,
          state: null,
          zipcode: null,
          phone: null,
        },
        temporaryAddress: {
          street: null,
          city: null,
          state: null,
          zipcode: null,
          phone: null,
          endDate: null
        },
        educationEmployment: {
          highSchool: {
            location: null,
            graduation: null
          },
          college: {
            location: null,
            yearsAttended: 0
          },
          extraCurricularActivities: {
            clubs: [],
            additionalInfo: null,
            athleticParticipation: null,
          },
          employment: {
            where: null,
            hoursPerWeek: {
              afterSchool: 0,
              summer: 0
            }
          }
        },
        academySelection: {
          first: null,
          second: null,
          third: null,
          fourth: null,
          where: null,
          previous: {
            where: null,
            when: null
          }
        },
        files: {
          transcript: null,
          guidance: null,
          recommendation: null,
          essay: null,
          photo: null
        }
      },
      message: null,
      rules: {
        required: () => {
          return v => !!v || `This is required`
        },
        email: () => {
          return v => /.+@.+/.test(v) || 'E-mail must be valid'
        },
        maxLength: (field, length) => {
          return v => (v && v.length <= length) || `${field} must be less than ${length} characters`
        },
        exactLength: (field, length) => {
          return v => (v && v.length === length) || `${field} must be exactly ${length} characters`
        }
      },
    }),
    watch: {
      dobMenu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
    },
    methods: {
      validate () {
        this.$refs.form.validate()
      },
      save (date) {
        this.$refs.dobMenu.save(date)
      },
      async formSubmit (e) {
        e.preventDefault();
        let formData = new FormData();
        formData.append("required-name", this.form.personal.name);
        formData.append("required-ssn", this.form.personal.ssn);
        formData.append("required-email", this.form.personal.email);
        formData.append("required-dob", this.form.personal.birth.date);
        formData.append("required-pob", this.form.personal.birth.place);
        formData.append("father-name", this.form.personal.parents.father.name);
        formData.append("father-occupation", this.form.personal.parents.father.occupation);
        formData.append("mother-name", this.form.personal.parents.mother.name);
        formData.append("mother-occupation", this.form.personal.parents.mother.occupation);

        formData.append("required-street", this.form.legalAddress.street);
        formData.append("required-city", this.form.legalAddress.city);
        formData.append("required-state", this.form.legalAddress.state);
        formData.append("required-zipcode", this.form.legalAddress.zipcode);
        formData.append("required-phone", this.form.legalAddress.phone);

        formData.append("temp-street", this.form.temporaryAddress.street);
        formData.append("temp-city", this.form.temporaryAddress.city);
        formData.append("temp-state", this.form.temporaryAddress.state);
        formData.append("temp-zipcode", this.form.temporaryAddress.zipcode);
        formData.append("temp-phone", this.form.temporaryAddress.phone);
        formData.append("temp-enddate", this.form.temporaryAddress.endDate);

        formData.append("required-highschool-location", this.form.educationEmployment.highSchool.location)
        formData.append("required-highschool-graduation", this.form.educationEmployment.highSchool.graduation)
        formData.append("college-location", this.form.educationEmployment.college.location)
        formData.append("college-yearsattended", this.form.educationEmployment.college.yearsAttended)
        formData.append("extra-clubs", this.form.educationEmployment.extraCurricularActivities.clubs.join(', '))
        formData.append("extra-clubs-info", this.form.educationEmployment.extraCurricularActivities.additionalInfo);
        formData.append("extra-clubs-sports", this.form.educationEmployment.extraCurricularActivities.athleticParticipation);

        formData.append("academy-selection-first", this.form.academySelection.first);
        formData.append("academy-selection-second", this.form.academySelection.second);
        formData.append("academy-selection-third", this.form.academySelection.third);
        formData.append("academy-selection-fourth", this.form.academySelection.fourth);
        formData.append("academy-selection-elsewhere", this.form.academySelection.elsewhere);
        formData.append("academy-selection-when", this.form.academySelection.when);

        formData.append("employment-where", this.form.educationEmployment.employment.where);
        formData.append("employment-hours-afterschool", this.form.educationEmployment.employment.hoursPerWeek.afterSchool);
        formData.append("employment-hours-summer", this.form.educationEmployment.employment.hoursPerWeek.summer);

        formData.append("file_transcript", this.form.files.transcript);
        formData.append("file_transcript", this.form.files.guidance);
        formData.append("file_recommendation", this.form.files.recommendation);
        formData.append("file_essay", this.form.files.essay);
        formData.append("file_photo", this.form.files.photo);
        console.log(formData)
        // await axios.post('https://hoyer.house.gov/', formData, {
        //   headers: {
        //     'Content-Type': 'multipart/form-data'
        //   }
        // })
      }
    }
  }
</script>

<style scoped>
  .required label::after {
    content: "*";
  }
</style>
